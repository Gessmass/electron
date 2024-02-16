


export const scanBluetoothDevices = async (serviceUUIDs) => {
  // S'assure que serviceUUIDs est un tableau
  const uuidsArray = Array.isArray(serviceUUIDs) ? serviceUUIDs : [serviceUUIDs];
  
  try {
    return await navigator.bluetooth.requestDevice({
      // Utilise uuidsArray au lieu de serviceUUIDs directement
      filters: [{services: ['cdeacb80-5235-4c07-8846-93a37ee6b86d']}]
    });
  } catch (error) {
    console.error("Error when scanning available bluetooth devices", error);
    throw error;
  }
};


const allowedDeviceIds = ['id1', 'id2', 'id3']

export const filterDevices = async (devices) => {
  return devices.filter(device => allowedDeviceIds.includes(device.id))
}

export const connectToDevice = async (filteredDevices) => {
  const connections = []
  
  for (const device of filteredDevices) {
    try {
      const server = await device.gatt.connect()
      console.log(`Connected to ${device.name}`)
      connections.push(server)
    } catch (error) {
      console.error(`Error when connecting to ${device.name} :`, error)
    }
  }
  return connections
}

export const subscribeToNotifications = async (device, characteristicUUId, serviceUUID, notificationCallback) => {
  try {
  const service = await device.gatt.getPrimaryService('cdeacb80-5235-4c07-8846-93a37ee6b86d')
  const characteristic = await service.getCharacteristic('cdeacb81-5235-4c07-8846-93a37ee6b86d')
  await characteristic.startNotifications()
  characteristic.addEventListener('characteristicvaluechanged', notificationCallback)
    console.log(`Abonné aux notif ${characteristicUUId} de ${serviceUUID}`)
  } catch (error) {
    console.error("Erreur d'abonnement aux notifs")
  }
}