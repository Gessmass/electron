// const {contextBridge, ipcRenderer} = require('electron/renderer')
//
// process.once("loaded", () => {
//   contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer)
// })
//
// window.require = require;
//

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});
