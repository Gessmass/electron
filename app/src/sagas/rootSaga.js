import {all} from 'redux-saga/effects'
import {watchBluetoothConnect} from "./bluetoothSagas.js";

function* rootSaga() {
  yield all([
    watchBluetoothConnect()
  ])
}

export default rootSaga
