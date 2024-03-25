const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// BLE functionality without exposing the entire Node.js API
contextBridge.exposeInMainWorld('bleAPI', {
    startScan: () => {
        ipcRenderer.on('start-ble-scan');
        console.log("bleAPI")
    }
});

