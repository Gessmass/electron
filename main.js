const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
const nobleManager = require('./shared/nobleManager.js');
const noble = require('@abandonware/noble');

const isMac = process.platform === 'darwin';
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableBlinkFeatures: "WebBluetooth",
      enableRemoteModule: true,
      // preload: path.join(__dirname, "preload.js")
    }
  });
  
  ipcMain.on('start-bluetooth-scan', (event, arg) => {
    console.log('main start');
    nobleManager.startScanning();
  });
  
  ipcMain.on('cancel-bluetooth-scan', (event, arg) => {
    console.log('main cancel');
    nobleManager.stopScanning();
  });
  
  // noble.on('discover', (peripheral) => {
  //   if (mainWindow) {
  //     mainWindow.webContents.send('discovered-device', {
  //       id: peripheral.id,
  //       name: peripheral.advertisement.localName,
  //     });
  //   }
  // });
  
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL('http://localhost:3000');
};

app.commandLine.appendSwitch("enable-experimental-web-platform-features", "true");
app.commandLine.appendSwitch("enable-web-bluetooth", "true");

app.whenReady().then(createWindow);

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
