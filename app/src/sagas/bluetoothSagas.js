import { call, put, takeEvery, take } from 'redux-saga/effects';
import { eventChannel } from "redux-saga";
import {
  deviceDataReceived,
  deviceConnected,
  connectionError
} from "../reducers/bluetoothSlice.js";
import {scanBluetoothDevices, connectToDevice, subscribeToNotifications, filterDevices} from "../connections/bluetooth.js";
// Supposons que servicesUUIDs, subscribeToNotifications, scanBluetoothDevices, filterDevices, et connectToDevice
// sont import�s ou d�finis quelque part accessible

const serviceUUIDs = 'cdeacb80-5235-4c07-8846-93a37ee6b86d';
const characteristicUUIDs = 'cdeacb81-5235-4c07-8846-93a37ee6b86d';


// Cette version de handleCharacteristicValueChanged accepte un emitter comme second argument.
function handleCharacteristicValueChanged(emitter) {
  return function(event) {
    const characteristicValue = event.target.value;
    // Supposons que les donn�es sont un ArrayBuffer et que nous voulons les lire comme un Uint8Array.
    const value = new Uint8Array(characteristicValue.buffer);
    
    console.log('Donn�es re�ues:', value);
    emitter(value); // Dispatche les donn�es via l'emitter du channel.
  };
}

function createDeviceChannel(characteristic, notificationCallback) {
  return eventChannel(emitter => {
    const handleNotification = (event) => {
      // Utiliser le callback pour traiter les donn�es re�ues et les �mettre via le channel
      notificationCallback(event, emitter);
    };
    
    // S'abonner aux notifications pour la caract�ristique
    characteristic.addEventListener('characteristicvaluechanged', handleNotification);
    
    // D�marrer les notifications
    characteristic.startNotifications();
    
    // La fonction de nettoyage lors de la fermeture du channel
    return () => {
      characteristic.stopNotifications()
        .then(() => characteristic.removeEventListener('characteristicvaluechanged', handleNotification));
    };
  });
}

function* listenToDevice(device, serviceUUID, characteristicUUID) {
  // Supposons que serviceUUID et characteristicUUID sont connus et correspondant � vos besoins
  
  try {
    const server = yield call(connectToDevice, device);
    const service = yield call([server, server.getPrimaryService], serviceUUID);
    const characteristic = yield call([service, service.getCharacteristic], characteristicUUID);
    
    const channel = yield call(createDeviceChannel, characteristic, handleCharacteristicValueChanged);
    
    while (true) {
      const data = yield take(channel);
      yield put(deviceDataReceived({ deviceId: device.id, data }));
    }
  } finally {
    console.log(`Nettoyage pour le dispositif ${device.name}`);
    // Ici, vous pouvez fermer le channel si n�cessaire, ou g�rer la d�connexion
  }
}

function* manageBluetoothConnections(action) {
  try {
    const device = yield call(scanBluetoothDevices(serviceUUIDs)); // Retourne un seul dispositif
    const filteredDevice = yield call(filterDevices, [device]); // Filtre bas� sur l'ID du dispositif
    
    for (const device of filteredDevice) {
      yield put(deviceConnected({ deviceId: device.id, name: device.name }));
      yield call(listenToDevice, device);
    }
  } catch (error) {
    console.error(error);
    yield put(connectionError(error.message));
  }
}

export function* watchBluetoothActions() {
  yield takeEvery('bluetooth/connectRequest', manageBluetoothConnections);
}
