import {START_SCAN, CANCEL_SCAN, SELECT_DEVICE} from "./types.js";

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