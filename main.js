const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
const scanBluetoothDevices = require('./services/bluetoothService')
const noble = require('@abandonware/noble')


const isMac = process.platform === 'darwin';
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
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

let discoveredDevicesIds = [];

ipcMain.handle('start-bluetooth-scan', async (event) => {

  noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
      noble.startScanningAsync();
      console.log('Scan started...')
    } else {
      noble.stopScanning()
      console.log("Bluetooth not available on this device")
    }
  });

  noble.on('discover', (peripheral) => {

    const device = {
      id: peripheral.id,
      name: peripheral.advertisement.localName,
      infos: {
        adress: peripheral.address,
        uuid: peripheral.uuid,
        adressType: peripheral.addressType,
        connectable: peripheral.connectable,
        state: peripheral.state
      }
    };

    const deviceAlreadyExists = discoveredDevicesIds.some(d => d === device.id )

    if (!deviceAlreadyExists && device.name) {
      discoveredDevicesIds.push(device.id);
      console.log("Device discovered :", device.name)
      mainWindow.webContents.send('bluetooth-device-discovered', device);
    }
  });
});


ipcMain.handle('cancel-bluetooth-scan', () => {
  console.log('Scan canceled')
  noble.stopScanning()
  discoveredDevicesIds = []
})

ipcMain.handle('select-bluetooth-device', async (event, deviceId) => {
  const SERVICE_UUID = 'cdeacb80-5235-4c07-8846-93a37ee6b86d';
  const CHARACTERISTIC_UUID = 'cdeacb81-5235-4c07-8846-93a37ee6b86d';

  console.log('select-bluetooth-device')
  if (noble.state === 'poweredOn') {
    await noble.startScanningAsync([SERVICE_UUID], false);
    console.log('Scanning...');
  } else {
    noble.on('stateChange', async (state) => {
      if (state === 'poweredOn') {
        await noble.startScanningAsync([SERVICE_UUID], false);
        console.log('Scanning...');
      } else {
        console.log('Bluetooth is not powered on.');
        await noble.stopScanningAsync();
      }
    });
  }

  noble.on('discover', async (peripheral) => {
    if (peripheral.id === deviceId || peripheral.address === deviceId) {
      await noble.stopScanningAsync();
      console.log(`Device found: ${peripheral.advertisement.localName}`);

      // Se connecter au dispositif
      await peripheral.connectAsync();
      console.log('Connected to device');

      // Découvrir les services et les caractéristiques
      const { characteristics } = await peripheral.discoverSomeServicesAndCharacteristicsAsync([SERVICE_UUID], [CHARACTERISTIC_UUID]);
      const oximeterCharacteristic = characteristics[0];

      // S'abonner aux notifications
      oximeterCharacteristic.subscribe((error) => {
        if (error) {
          console.error('Error subscribing to oximeterCharacteristic', error);
        } else {
          console.log('Subscribed to oximeterCharacteristic notifications');
        }
      });

      // Gérer les données reçues
      oximeterCharacteristic.on('data', (data, isNotification) => {
        console.log('Oximeter data received', data);
        mainWindow.webContents.send('bluetooth-notification', data)
      });

    }
  });
  
  process.on('SIGINT', async () => {
    console.log('Disconnecting...');
    await noble.stopScanningAsync();
    process.exit();
  });
})