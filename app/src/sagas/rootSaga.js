import { all } from 'redux-saga/effects'
import bluetoothSaga from "./bluetoothSaga.js";

function* rootSaga() {
  yield all([
    bluetoothSaga()
  ])
}
export default rootSaga