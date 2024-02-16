import { all } from 'redux-saga/effects'
import {watchBluetoothActions} from "./bluetoothSagas.js";

function* rootSaga() {
  yield all([
    watchBluetoothActions()
  ])
}
export default rootSaga