const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
const {BluetoothScanner} = require('./services/bleService');



const isMac = process.platform === 'darwin';
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
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

// Gestion du scan bluetooth
const scanner = new BluetoothScanner();
ipcMain.handle('scan-for-devices', async (event) => {
  return new Promise((resolve, reject) => {
    scanner.startScan((device) => {
      event.sender.send('device-discovered', device);
    });
  });
});

ipcMain.handle('select-bluetooth-device', (event, deviceId) => {
  console.log('select-bluetooth-device', deviceId)
  return scanner.selectDevice(deviceId)
})



