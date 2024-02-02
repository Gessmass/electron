const {app, BrowserWindow, ipcMain} = require('electron')
const path = require("path")

const isDev = process.env.IS_DEV === true
const isMac = process.platform === 'darwin'

let selectBluetoothCallback
let bluetoothPinCallback

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableBlinkFeatures: "WebBluetooth",
      preload: path.join(__dirname, "preload.js")
    }
  });
  
  
  mainWindow.webContents.openDevTools()
  

    // mainWindow.loadFile(path.join(__dirname, 'app', 'build', 'index.html'))
 mainWindow.loadURL('http://localhost:3000')
  
  mainWindow.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    selectBluetoothCallback = callback
    const result = deviceList.find((device) => {
      return device.deviceName === 'test'
    })
    if (result) {
      callback(result.deviceId)
    } else {
    
    }
  })
}

ipcMain.on('get-bluetooth-devices', (event) => {
  const deviceList
})


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


