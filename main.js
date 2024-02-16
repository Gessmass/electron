const {app, BrowserWindow, ipcMain, ipcRenderer} = require('electron')
const path = require("path")

const isMac = process.platform === 'darwin'

let callbackFroBluetoothEvent

const createWindow = () => {
  const mainWindow = new BrowserWindow({
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
  
  mainWindow.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault();
    console.log('Device list:', deviceList);
    let result = deviceList[0];
    if (!result) {
      callback('');
    } else {
      callback(result.deviceId);
    }
  });

  // ipcMain.on('channel-to-select-device', (event, deviceId) => {
  //   callbackFroBluetoothEvent(deviceId)
  //   console.log(`Device selected is ${deviceId}`)
  // })
  //
  // ipcMain.on('cancel-devices-scan', _ => {
  //   callbackFroBluetoothEvent('')
  //   console.log("Scan canceled")
  // })
  
  mainWindow.webContents.openDevTools()
  
  // mainWindow.loadURL(`file://${path.join(__dirname, `./dist/index.html`)}`)
  mainWindow.loadURL('http://localhost:3000')
}

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

