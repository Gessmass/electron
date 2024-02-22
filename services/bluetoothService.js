// const noble = require('@abandonware/noble');
//
// const scanBluetoothDevices = async () => {
//   return new Promise((resolve, reject) => {
//     let discoveredDevices = [];
//
//     noble.on('stateChange', async (state) => {
//       if (state === 'poweredOn') {
//         await noble.startScanningAsync([], true);
//         console.log("Scanning started...");
//       } else {
//         reject('Bluetooth is not powered on.');
//         await noble.stopScanningAsync();
//       }
//     });
//
//     noble.on('discover', async (peripheral) => {
//       const device = {
//         id: peripheral.id,
//         name: peripheral.advertisement.localName
//       }
//
//       const deviceAlreadyExists = discoveredDevices.some(d => d.id === device.id )
//
//       if (!deviceAlreadyExists && device.name) {
//       console.log(`Discovered device: ${peripheral.advertisement.localName} => ${peripheral.id}`);
//       discoveredDevices.push(device);
//
//       // Resolve the promise with the list of devices once scanning is stopped
//       resolve(discoveredDevices)
//       }
//     });
//   });
// };
//
// module.exports = scanBluetoothDevices