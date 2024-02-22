import { all } from 'redux-saga/effects'
import {bluetoothSaga, stopBluetoothScan} from "./bluetoothSaga.js";
import J500FSaga from "./J500FSaga.js";

function* rootSaga() {
  yield all([
    bluetoothSaga(),
    stopBluetoothScan(),
    J500FSaga()
  ])
}
export default rootSaga