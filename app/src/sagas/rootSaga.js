import { all } from 'redux-saga/effects'
import {bluetoothSaga, stopBluetoothScan} from "./bluetoothSaga.js";
import connectDeviceSaga from "./connectDeviceSaga.js";

function* rootSaga() {
  yield all([
    bluetoothSaga(),
    stopBluetoothScan(),
    connectDeviceSaga()
  ])
}
export default rootSaga