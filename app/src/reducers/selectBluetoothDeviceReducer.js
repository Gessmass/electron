import {DEVICE_CONNECTED, SELECT_DEVICE} from "../actions/types.js";

const initialState = {
  deviceId: null,
  deviceInfos: null
}

const selectBluetoothDeviceReducer = (state= initialState, action) => {
  switch (action.type) {
    case SELECT_DEVICE:
      return {
        ...state,
        deviceId: action.payload
      };
    case DEVICE_CONNECTED:
      console.log(action.payload)
      return {
        ...state,
        deviceInfos: action.payload.deviceInfos
      }
    default :
      return state
  }
}

export default selectBluetoothDeviceReducer