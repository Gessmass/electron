import {DISCOVERED_DEVICES, SCAN_STOPPED, START_SCAN} from "../actions/types.js"; // Assurez-vous d'avoir le bon chemin d'accès

const initialState = {
  deviceList: [],
  isScanning: false
};

const bluetoothReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISCOVERED_DEVICES:
      return {
        isScanning: false,
        deviceList: [...state.deviceList, action.payload.device]
      };
    case START_SCAN:
      console.log('SCAN_DEVICES action received')
      return {
        ...state,
        isScanning: true
      }
    case SCAN_STOPPED:
      console.log('SCAN_STOPPED action received')
      return {
        ...state,
        isScanning: false
      }
    default:
      return state;
  }
};

export default bluetoothReducer;
