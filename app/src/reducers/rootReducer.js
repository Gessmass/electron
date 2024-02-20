import {combineReducers} from "redux";
import bluetoothReducer from '../reducers/bluetoothReducer.js'
import selectBluetoothDeviceReducer from "./selectBluetoothDeviceReducer.js";

const rootReducer = combineReducers({
  bluetooth: bluetoothReducer,
  connectDevice: selectBluetoothDeviceReducer
})

export default rootReducer