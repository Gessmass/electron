const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  scanForDevices: () => ipcRenderer.invoke('start-bluetooth-scan'),
  stopDevicesScan: () => ipcRenderer.invoke('cancel-bluetooth-scan'),
  onDeviceDiscovered: (callback) => {
    ipcRenderer.on('bluetooth-device-discovered', (event, device) => callback(device));
  },
  offDeviceDiscovered: () => {
    ipcRenderer.removeAllListeners('bluetooth-device-discovered');
  },
  selectDevice: (deviceId) => ipcRenderer.invoke('select-bluetooth-device', deviceId),
  bluetoothNotification: (callback) => ipcRenderer.on('bluetooth-notification', (event, data) => callback(data)),
  offBluetoothNotifications: () => {
    ipcRenderer.removeAllListeners('bluetooth-notification');
  },
});

