import { takeLatest, call, put } from 'redux-saga/effects';
import {DEVICE_CONNECTED, SELECT_DEVICE} from "../actions/types.js";
// Fonction worker Saga pour g�rer la connexion
function* connectToDeviceSaga(action) {
  const deviceId = action.payload;
  try {
    const deviceInfos = yield call(connectToDevice, deviceId);
    console.log(deviceInfos)
    yield put({ type: DEVICE_CONNECTED, payload: deviceInfos });
  } catch (error) {
    console.error("Erreur lors de la connexion au dispositif :", error);
    // G�rer les erreurs �ventuelles
  }
}

const connectToDevice = async (deviceId) => {
  console.log('connectDeviceSaga.js', deviceId)
  const deviceInfos = await window.electronAPI.selectDevice(deviceId)
  return deviceInfos
}

// Saga watcher qui d�marre la saga de connexion lorsqu'une action SELECT_DEVICE est dispatch�e
function* watchConnectToDevice() {
  yield takeLatest(SELECT_DEVICE, connectToDeviceSaga);
}

export default watchConnectToDevice