const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
const {Worker, parentPort} = require('worker_threads')
const noble = require("@abandonware/noble");


const isMac = process.platform === 'darwin';

if (require('electron-squirrel-startup')) app.quit();

let mainWindow;
let bluetoothWorker

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableBlinkFeatures: "WebBluetooth",
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js")
    }
  });
  
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL('http://localhost:3000');
};

app.commandLine.appendSwitch("enable-experimental-web-platform-features", "true");
app.commandLine.appendSwitch("enable-web-bluetooth", "true");

app.whenReady().then(createWindow);



bluetoothWorker = new Worker('./services/bluetoothService.js');

bluetoothWorker.on('message', (message) => {
  if (message.type === 'bluetooth-unsupported') {
    mainWindow.webContents.send('bluetooth-unsupported', message.data)
  }
})

bluetoothWorker.on('message', (message) => {
  if (message.type === 'device-discovered') {
    mainWindow.webContents.send('bluetooth-device-discovered', message.data)
    console.log("device discovered :", message.data.name)
  }
});

ipcMain.on('start-bluetooth-scan', (event) => {
  bluetoothWorker.postMessage('startScan')
})



app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
