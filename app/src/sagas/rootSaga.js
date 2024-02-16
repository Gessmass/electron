import { all } from 'redux-saga/effects'
import bluetoothSagas from "./bluetoothSagas.js";

function* rootSaga() {
  yield all([
    bluetoothSagas()
  ])
}
export default rootSaga