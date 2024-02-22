import {
  CANCEL_SCAN,
  DATA_RECEIVED,
  DISCOVERED_DEVICES, NOTIFICATION_RECEIVED,
  SCAN_STOPPED,
  SELECT_DEVICE,
  START_SCAN
} from "../actions/types.js"; // Assurez-vous d'avoir le bon chemin d'accès

const initialState = {
  deviceList: [],
  isScanning: false,
  selectedDeviceId: null,
  selectedDeviceInfos: null,
  serviceNotification: null
};

const bluetoothReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISCOVERED_DEVICES:
      return {
        ...state,
        deviceList: [...state.deviceList, action.payload]
      };
    case START_SCAN:
      console.log('SCAN_DEVICES action received')
      return {
        ...state,
        isScanning: true,
        deviceList: []
      }
    case SCAN_STOPPED:
      console.log('SCAN_STOPPED action received')
      return {
        ...state,
        isScanning: false
      }
    case SELECT_DEVICE:
      console.log(`reducer device id is ${action.payload}`)
        return {
        ...state,
          selectedDeviceId: action.payload
        }
    case DATA_RECEIVED:
      return {
        ...state,
        selectedDeviceInfos: action.payload
      }
    case NOTIFICATION_RECEIVED:
      return {
        ...state,
        serviceNotification: action.payload
      }
    default:
      return state;
  }
};

export default bluetoothReducer;
