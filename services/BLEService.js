const { parentPort } = require('worker_threads');
const noble = require('@abandonware/noble');

discoveredDevices = []

noble.on('discover', (peripheral) => {
    if (parentPort) {
        parentPort.postMessage({
            id: peripheral.id,
            name: peripheral.advertisement.localName,
        });
    }
});

parentPort.on('message', (message) => {
    if (message === 'start-ble-scan') {
        noble.on('stateChange', (state) => {
            if (state === 'poweredOn') {
                console.log("Bluetooth powered on")
                noble.startScanning();
            } else {
                noble.stopScanning()
                parentPort.postMessage({
                    type: 'bluetooth-unsupported',
                    data: state
                });
            }
        })
    } else if (message === 'stopScan') {
        noble.stopScanning();
    }
});

noble.on('discover', (peripheral) => {
    // Postez le périphérique découvert au processus principal comme avant

    const deviceAlreadyDiscovered = discoveredDevices.includes(peripheral.id)


    if (!deviceAlreadyDiscovered && peripheral.advertisement.localName) {
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
        }
        discoveredDevices.push(peripheral.id)
        parentPort.postMessage({
            type: 'device-discovered',
            data: device
        })
    }
});

// Ajouter des écouteurs pour les messages de connexion/déconnexion
parentPort.on('message', (message) => {
    if (message.command === 'connect') {
        // Implémenter la logique de connexion
    } else if (message.command === 'disconnect') {
        // Implémenter la logique de déconnexion
    }
    // Autres commandes
});