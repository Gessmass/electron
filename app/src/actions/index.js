import {SCAN_DEVICES} from "./types.js";

export const scanBluetoothDevices = () => {
  console.log("action")
  return {
    type: SCAN_DEVICES,
  }
}