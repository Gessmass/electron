const {app, BrowserWindow, ipcMain, ipcRenderer} = require('electron')
const path = require("path")

const isMac = process.platform === 'darwin'

let selectBluetoothCallback

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
  mainWindow.webContents.openDevTools()
  
  mainWindow.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    console.log(deviceList)
    let bluetoothDeviceList = deviceList
    selectBluetoothCallback = callback
    
    mainWindow.webContents.send('channelFroBluetoothDeviceList', bluetoothDeviceList)
  })
  
    // mainWindow.loadFile(path.join(__dirname, 'app', 'public', 'index.html'))
 mainWindow.loadURL('http://localhost:3000')
  
  ipcMain.on('channelForTerminationSignal', __  => {
    selectBluetoothCallback('')
    console.log("Discovery cancelled")
  })
  
  ipcMain.on('channelForSelectingDevice', (event, DeviceId) => {
    selectBluetoothCallback(sentDeviceId)
    console.log("Device selected, discovery finished")
  })
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


