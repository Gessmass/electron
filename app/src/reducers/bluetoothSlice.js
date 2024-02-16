import {createSlice} from '@reduxjs/toolkit'

export const bluetoothSlice = createSlice({
  name: "bluetooth",
  initialState: {
    devices: {},
    error: null,
  },
  reducers: {
    connectRequest: (state) => {
    
    },
    deviceConnected: (state, action) => {
      const {deviceId, deviceInfo} = action.payload
      state.devices[deviceId] = {...deviceInfo, data: []}
    },
    deviceDataReceived: (state, action) => {
      const {deviceId, data} = action.payload;
      if(state.devices[deviceId]) {
        state.devices[deviceId].data.push(data)
      }
    },
    connectionError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {connectRequest,deviceConnected, deviceDataReceived, connectionError} = bluetoothSlice.actions

export default bluetoothSlice.reducer
//Penser � importer le fichier par "bluetoothReducer" car RTK cr�e automatiquement un reducer avec la m�thode .reducer

