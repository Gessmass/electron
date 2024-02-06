const {BrowserWindow, ipcRenderer} = require('electron')
const discoverDevices = () => {
  navigator.bluetooth.requestDevice({
    filters: [{
      namePrefix: "Appareil"
    }]
  })
  startDevicePicker()
}

const startDevicePicker = () => {
  let devicePicker = null
  let mainProcessDeviceList = null
  
  devicePicker = new BrowserWindow({
    width: 350,
    height: 270,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  devicePicker.loadFile('devicePicker.jsx')
  
  ipcRenderer.on('channelForBluetoothDeviceList', (event, list) => {
    mainProcessDeviceList = list
    devicePickerStarted.then(_=> {
      console.log("Promise resolved")
      ipcRenderer.send(devicePicker.webContents.id, 'bluetoothDeviceDiscoverList', mainProcessDeviceList)
    })
  })
  
  const devicePickerStarted = new Promise(
    function (resolve, reject) {
      console.log("Promise started")
      devicePicker.once('ready-to-show', () => {
        resolve();
        console.log("Devicepicker is ready")
      })
    }
  )
  
  devicePicker.on('closed', _=> {
    devicePicker = null
    ipcRenderer.removeAllListeners('channelForBluetoothDeviceList')
    ipcRenderer.removeAllListeners('currentWindowId')
    ipcRenderer.removeAllListeners('receivedDeviceList')
  })
}