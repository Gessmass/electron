import { call, select, take, takeEvery } from 'redux-saga/effects'
import { SCAN_STARTED, START_SCAN } from "../actions/types.js";
import * as fromReducers from "../reducers/index.js";


function* scanWorker() {
    try {
        console.log("scan worker")
        yield call(window.bleAPI.startScan)
        const authDevices = yield select(fromReducers.getAuthDevices)
        console.log(authDevices)
        while (true) {
            let action = yield take(SCAN_STARTED)
        }

    } catch (err) {
        console.log(err)
    }
}

function* BLESaga() {
    yield takeEvery(START_SCAN, scanWorker)
    console.log("BLESaga")
}

export default BLESaga