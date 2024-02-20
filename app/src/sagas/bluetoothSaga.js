import { takeLatest, put, call } from 'redux-saga/effects';
import {CANCEL_SCAN, DISCOVERED_DEVICES, SCAN_STARTED, SCAN_STOPPED, START_SCAN} from "../actions/types.js";


const getDevice = async () => {
  try {
    const device = await window.electronAPI.scanForDevices()
    console.log('devices', device)
    return device
  } catch (err) {
    console.error(err)
  }
}

// Fonction worker pour scanner les devices Bluetooth
function* scanDevicesWorker() {
  try {
    // On démarre le scan
    yield put({ type: SCAN_STARTED})
    const device = yield call(getDevice);
    // Dispatch d'une action avec les devices découverts
    console.log(device)
    yield put({ type: DISCOVERED_DEVICES, payload: { device } });
    yield put({ type: SCAN_STOPPED})
  } catch (err) {
    console.error("Erreur lors du scan Bluetooth :", err);
    // Ici, vous pouvez gérer les erreurs, par exemple en dispatchant une action d'erreur
  }
}

const cancelScan = async () => {
  try {
    await window.electronAPI.stopDevicesScan()
  } catch (err) {
    console.log(err)
  }
}

// Saga watcher pour le Bluetooth
export function* bluetoothSaga() {
  yield takeLatest(START_SCAN, scanDevicesWorker);
}

export function* stopBluetoothScan() {
  yield takeLatest(CANCEL_SCAN, cancelScan)
}

export default {bluetoothSaga, stopBluetoothScan};
