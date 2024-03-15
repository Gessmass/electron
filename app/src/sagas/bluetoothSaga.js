import { take, call, put, takeLatest,takeEvery } from 'redux-saga/effects';
import {
  CANCEL_SCAN, DATA_RECEIVED,
  DISCOVERED_DEVICES,
  SCAN_STARTED,
  SCAN_STOPPED, SELECT_DEVICE,
  START_SCAN
} from "../actions/types.js";
import {eventChannel} from "redux-saga";


// Creer un canal pour �couter les �v�nements de dispositifs d�couverts
function createDeviceDiscoveredChannel() {
  return eventChannel(emitter => {
    const handler = (device) => {
      emitter(device);
    };
    
    window.electronAPI.onDeviceDiscovered(handler);
    
    // La fonction de retour est appel�e lors de la fermeture du canal
    return () => {
      console.log("Nettoyage: suppression des listeners d'�v�nements");
      window.electronAPI.offDeviceDiscovered(handler); // Assurez-vous d'impl�menter cette fonction offDeviceDiscovered pour nettoyer les listeners
    };
  });
}

// Fonction worker pour scanner les devices Bluetooth
function* scanDevicesWorker() {
  const channel = createDeviceDiscoveredChannel();
  try {
    // On d�marre le scan
    yield put({ type: SCAN_STARTED });
    window.electronAPI.scanForDevices(); // D�marre le scan sans attendre ici car les r�sultats viendront via le canal
    
    while (true) {
      // Attendre le dispositif d�couvert depuis le canal
      const device = yield take(channel);
      yield put({ type: DISCOVERED_DEVICES, payload: device });
    }
  } catch (err) {
    console.error("Erreur lors du scan Bluetooth :", err);
  } finally {
    channel.close(); // Ferme le canal lorsque le scan est arr�t� ou en cas d'erreur
    yield put({ type: SCAN_STOPPED });
    console.log("Fermeture du canal et nettoyage");
  }
}
function* stopDevicesScan() {
  try {
    yield call(window.electronAPI.stopDevicesScan);
    console.log('stop scan saga');
    yield put({ type: SCAN_STOPPED }); // D�clenche l'action ici
  } catch (err) {
    console.log(err);
  }
}

// Saga watcher et arr�t du scan Bluetooth
export function* bluetoothSaga() {
  yield takeLatest(START_SCAN, scanDevicesWorker);
  console.log('scanstart saga')
}

export function* stopBluetoothScan() {
  yield takeEvery(CANCEL_SCAN, stopDevicesScan);
  console.log('cancel scan resolved')
}







