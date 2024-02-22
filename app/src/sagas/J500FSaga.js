import { call, fork,take, takeEvery } from 'redux-saga/effects';
import {SELECT_DEVICE} from "../actions/types.js";
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
  console.log('selectDeviceWorker', action.payload)
  yield fork(selectDeviceById, action.payload)
  const channel = yield call(createBluetoothNotificationsChannel)

  while(true) {
    const data = yield take(channel)
    const parsedData= J500Fparser(data)
    console.log('Notification bluetooth', parsedData)
  }
}

const selectDeviceById = (deviceId) => {
  console.log('selectDeviceById', deviceId)
  window.electronAPI.selectDevice(deviceId)
}
export default function* J500FSaga() {
  console.log("J500FSaga")
  yield takeEvery(SELECT_DEVICE, selectDeviceWorker)
}