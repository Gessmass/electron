import {takeLatest, put} from 'redux-saga/effects'
import {devices} from "../connections/bluetooth.js";
import {DISCOVERED_DEVICES, SCAN_DEVICES} from "../actions/types.js";


function* scanDevicesWorker() {
  console.log("scanDevicesWorker", devices)
   yield put({type: DISCOVERED_DEVICES, payload: {devices}})
}
function* bluetoothSaga() {
  console.log("bluetoothSaga")
  yield takeLatest(SCAN_DEVICES, scanDevicesWorker)
}

export default bluetoothSaga