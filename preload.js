const {contextBridge, ipcRenderer} = require('electron/renderer')

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer)
})

window.require = require;

