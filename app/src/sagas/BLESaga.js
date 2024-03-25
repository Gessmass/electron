import { call, select, take } from 'redux-saga/effects'
import { SCAN_STARTED, START_SCAN } from "../actions/types.js";
import * as fromReducers from "../reducers/index.js";


function* scanWorker() {
    try {
        console.log("scan worker")
        yield call()
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
    yield take(START_SCAN, scanWorker)
    console.log("BLESaga")
}

export default BLESaga