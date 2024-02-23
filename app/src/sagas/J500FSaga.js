import { call, put, fork,take, takeEvery } from 'redux-saga/effects';
import {NOTIFICATION_RECEIVED, SELECT_DEVICE} from "../actions/types.js";
import {eventChannel} from "redux-saga";
import {J500Fparser} from "../parsers/J500Fparser.js";


const createBluetoothNotificationsChannel = (deviceId) => {
  return eventChannel(emitter => {
    const handler = (data) => {
      emitter(data)
    }

    window.electronAPI.bluetoothNotification(handler)

    return () => {
      window.electronAPI.offBluetoothNotifications(handler)
    }
  })
}



function* selectDeviceWorker(action) {
  yield fork(selectDeviceById, action.payload)
  const channel = yield call(createBluetoothNotificationsChannel)

  while(true) {
    const data = yield take(channel)
    let dataView;
    if (data instanceof DataView) {
      dataView = data;
    } else if (data.buffer && data.buffer instanceof ArrayBuffer) {
      dataView = new DataView(data.buffer);
    } else if (data instanceof ArrayBuffer) {
      dataView = new DataView(data);
    } else {
      {
        console.error("L'objet fourni n'est pas un DataView ou un ArrayBuffer.");
        return;
      }
    }
    const parsedData= J500Fparser(dataView)
    if (parsedData) {
      yield put({ type: NOTIFICATION_RECEIVED, payload: parsedData})
    }
  }
}

const selectDeviceById = (deviceId) => {
  window.electronAPI.selectDevice(deviceId)
}
export default function* J500FSaga() {
  yield takeEvery(SELECT_DEVICE, selectDeviceWorker)
}