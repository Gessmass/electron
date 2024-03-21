import { all } from 'redux-saga/effects'
import BLESaga from "./BLESaga.js";

function* rootSaga() {
    yield all([
        BLESaga
    ])
}

export default rootSaga