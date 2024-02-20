const noble = require('@abandonware/noble');

// Crée un objet contrôleur pour gérer le scan
class BluetoothScanner {
  constructor() {
    this.discoveredDevices = [];
    this.scanning = false;
    this.deviceSelected = false; // Nouveau flag pour contrôler la sélection
  }
  
  startScan(callback) {
    noble.on('stateChange', async (state) => {
      if (state === 'poweredOn') {
        this.scanning = true;
        await noble.startScanning();
        console.log("Scan started");
      } else {
        console.log('Bluetooth is not turned on.');
      }
    });
    
    noble.on('discover', (peripheral) => {
      const device = {
        id: peripheral.id,
        name: peripheral.advertisement.localName,
        rssi: peripheral.rssi
      };
      
      const deviceExists = this.discoveredDevices.some(d => d.id === device.id);
      
      if (!deviceExists && device.name) {
        this.discoveredDevices.push(device);
        console.log("Discovered device:", device);
        callback(device); // Appel du callback avec le dispositif découvert
      }
    });
  }
  
  async selectDevice(deviceId) {
    return new Promise((resolve, reject) => {
      // Si le dispositif est déjà dans la liste découverte, le résoudre immédiatement
      const device = this.discoveredDevices.find(d => d.id === deviceId);
      if (device) {
        noble.stopScanning();
        this.scanning = false;
        console.log(`Device ${device.name} selected`);
        resolve(device);
        return;
      }
      
      // Écouter les nouveaux dispositifs après la méthode selectDevice a été appelée
      noble.on('discover', (peripheral) => {
        if (peripheral.id === deviceId) {
          noble.stopScanning();
          this.scanning = false;
          console.log(`Device ${peripheral.advertisement.localName} selected`);
          resolve({
            infos: peripheral.rssi
          });
        }
      });
    });
  }
}



module.exports = {BluetoothScanner};
