const noble = require('@abandonware/noble');

// Cr�e un objet contr�leur pour g�rer le scan
class BluetoothScanner {
  constructor() {
    this.discoveredDevices = [];
    this.scanning = false;
    this.deviceSelected = false; // Nouveau flag pour contr�ler la s�lection
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
        callback(device); // Appel du callback avec le dispositif d�couvert
      }
    });
  }
  
  async selectDevice(deviceId) {
    return new Promise((resolve, reject) => {
      // Si le dispositif est d�j� dans la liste d�couverte, le r�soudre imm�diatement
      const device = this.discoveredDevices.find(d => d.id === deviceId);
      if (device) {
        noble.stopScanning();
        this.scanning = false;
        console.log(`Device ${device.name} selected`);
        resolve(device);
        return;
      }
      
      // �couter les nouveaux dispositifs apr�s la m�thode selectDevice a �t� appel�e
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
