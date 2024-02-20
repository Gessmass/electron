// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  scanForDevices: () => ipcRenderer.invoke('scan-for-devices'),
  stopDevicesScan: () => ipcRenderer.invoke('cancel-bluetooth-scan'),
  onDeviceDiscovered: (callback) => ipcRenderer.on('device-discovered', (event, device) => callback(device)),
  selectDevice: (deviceId) => ipcRenderer.invoke('select-bluetooth-device', deviceId)
});

