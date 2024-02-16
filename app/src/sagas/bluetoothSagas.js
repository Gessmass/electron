import { take, put, takeLatest, call, all } from 'redux-saga/effects';
import { eventChannel, cancel } from 'redux-saga';
import { discoveredDevice, receivedData } from '../reducers/bluetoothSlice.js';

const { ipcRenderer } = window.require('electron');

function createIpcChannel(eventName) {
  return eventChannel((emit) => {
    const handler = (event, data) => emit(data);
    ipcRenderer.on(eventName, handler);
    return () => ipcRenderer.removeListener(eventName, handler);
  });
}

function* listenForDevices() {
  const channel = createIpcChannel('discovered-device');
  try {
    while (true) {
      const device = yield take(channel);
      yield put(discoveredDevice(device));
    }
  } catch (error) {
    console.error('Error in listenForDevices:', error);
  } finally {
      channel.close();
      console.log('Channel for discovered-device closed');
  }
}

function* listenForData() {
  const channel = createIpcChannel('received-data');
  try {
    while (true) {
      const data = yield take(channel);
      yield put(receivedData(data));
    }
  } catch (error) {
    console.error('Error in listenForData:', error);
  } finally {
      channel.close();
      console.log('Channel for received-data closed');
  }
}

function* handleStartScan() {
  ipcRenderer.send('start-bluetooth-scan');
}

function* handleStopScan() {
  ipcRenderer.send('cancel-bluetooth-scan');
}

function* handleSelectDevice(action) {
  ipcRenderer.send('channel-to-select-device', action.payload);
}

export default function* bluetoothSagas() {
  yield takeLatest('BLUETOOTH/START_SCAN', handleStartScan);
  yield takeLatest('BLUETOOTH/STOP_SCAN', handleStopScan);
  yield takeLatest('BLUETOOTH/SELECT_DEVICE', handleSelectDevice);
  yield all([
    call(listenForDevices),
    call(listenForData),
  ]);
}
