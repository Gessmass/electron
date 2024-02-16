const noble = require('@abandonware/noble');
const {mainWindow} = require('../main.js')

let scanningStarted = false;

const startScanning = () => {
  if (!scanningStarted) {
    // Ajoutez l'écouteur d'événement `discover` ici pour filtrer les périphériques par nom
    noble.on('discover', (peripheral) => {
      const { localName } = peripheral.advertisement;
      if (localName) { // Doesn't send device if it has no name
        mainWindow.webContents.send('discovered-device', {
          id: peripheral.id,
          name: localName,
          rssi: peripheral.rssi
        });
      }
    });
    
    noble.on('stateChange', (state) => {
      if (state === 'poweredOn') {
        noble.startScanning();
        scanningStarted = true;
        console.log('Scanning started...');
      } else {
        noble.stopScanning();
        scanningStarted = false;
        console.log('Bluetooth is not powered on.');
      }
    });
    
    if (noble.state === 'poweredOn' && !scanningStarted) {
      noble.startScanning();
      scanningStarted = true;
      console.log('Scanning started...');
    }
  } else {
    console.log('Scanning is already in progress...');
  }
};

const stopScanning = () => {
  if (scanningStarted) {
    noble.stopScanning();
    scanningStarted = false;
    console.log('Scanning stopped.');
  } else {
    console.log('Scanning was not started.');
  }
};

module.exports = { startScanning, stopScanning };
