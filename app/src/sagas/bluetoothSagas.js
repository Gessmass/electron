import { eventChannel } from 'redux-saga';
import { takeLatest, call, put, take } from 'redux-saga/effects';
import { BLUETOOTH_CONNECT_REQUEST, bluetoothConnectSuccess, bluetoothConnectFailure, bluetoothDataReceived } from '../actions/bluetoothActions.js';
import { J500Fparser } from "../parsers/J500Fparser.js";

// Création du canal pour écouter les notifications Bluetooth
function createNotificationChannel(characteristic) {
  return eventChannel(emit => {
    const handler = event => {
      const value = event.target.value;
      const parsedValue = J500Fparser(value);
      emit(parsedValue); // Envoyer la valeur parsée dans le canal
    };
    
    characteristic.addEventListener('characteristicvaluechanged', handler);
    
    // La fonction de nettoyage lors de la fermeture du canal
    return () => {
      characteristic.removeEventListener('characteristicvaluechanged', handler);
    };
  });
}

function* subscribeToNotifications(device) {
  try {
    console.log("subscribe notifs")
    const service = yield call([device.gatt, device.gatt.getPrimaryService], 'cdeacb80-5235-4c07-8846-93a37ee6b86d');
    const characteristic = yield call([service, service.getCharacteristic], 'cdeacb81-5235-4c07-8846-93a37ee6b86d');
    yield call([characteristic, characteristic.startNotifications]);
    
    const channel = createNotificationChannel(characteristic);
    
    while (true) {
      const parsedValue = yield take(channel);
      console.log('Notification reçue', parsedValue);
      yield put(bluetoothDataReceived(parsedValue));
    }
  } catch (error) {
    console.error('Erreur lors de la souscription aux notifications', error);
    // Gérer l'erreur, potentiellement en dispatchant une action d'erreur
  }
}

function* connectBluetoothSaga() {
  try {
    const device = yield call(connectToDevice);
    yield put(bluetoothConnectSuccess(device));
    yield call(subscribeToNotifications, device);
  } catch (error) {
    yield put(bluetoothConnectFailure(error));
  }
}

const connectToDevice = () => {
  console.log('connect to device')
  return navigator.bluetooth.requestDevice({
    filters: [{ services: ['cdeacb80-5235-4c07-8846-93a37ee6b86d'] }]
  }).then(device => device.gatt.connect());
}

export function* watchBluetoothConnect() {
  yield takeLatest(BLUETOOTH_CONNECT_REQUEST, connectBluetoothSaga);
}
