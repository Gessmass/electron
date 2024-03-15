import {
  START_SCAN,
  CANCEL_SCAN,
  SELECT_DEVICE,
  DEVICE_CONNECTING,
  DEVICE_CONNECTED,
  DEVICE_DISCONNECTED, DEVICE_CONNECTION_ERROR, SAVE_BLE_DATA, BLUETOOTH_UNSUPPORTED
} from "./types.js";

export const startScanBluetoothDevices = () => {
  return {
    type: START_SCAN,
  }
}

export const stopScanBluetoothDevices = () => {
  console.log("stopScanBluetoothDevices")
  return {
    type: CANCEL_SCAN
  }
}

export const selectBluetoothDevice = (deviceId) => {
  console.log('selectBluetoothDevice ACTION')
  return {
  type: SELECT_DEVICE,
  payload: deviceId
  }
}

export const deviceConnecting = (deviceId) => {
  return {
    type: DEVICE_CONNECTING,
    payload: deviceId
  }
}

export const deviceConnected = (deviceId) => {
  return {
    type: DEVICE_CONNECTED,
    payload: deviceId
  }
}

export const deviceDisconnected = (deviceId) => {
  return {
    type: DEVICE_DISCONNECTED,
    payload: deviceId
  }
}

export const deviceConnectionError = (deviceId, error) => {
  return {
    type: DEVICE_CONNECTION_ERROR,
    payload: deviceId, error
  }
}

export const SaveBLEData = (dataType, value, unit) => {
  return {
  type: SAVE_BLE_DATA,
  payload: dataType, value, unit
  }
}

export const bluetoothUnsupported = () => {
  return {
    type: BLUETOOTH_UNSUPPORTED
  }
}