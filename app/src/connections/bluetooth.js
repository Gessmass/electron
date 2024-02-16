const connectAndSetupNotifications = async (peripheral) => {
  await peripheral.connectAsync()
  const {characteristics} = await peripheral.discoverAllServicesAndCharacteristics([serviceUUID], [characteristicUUID])
  const characteristic = characteristics[0]
  
  characteristic.on('data', (data, isNotification) => {
    console.log(`Received data${data.toString('utf8')}`)
  })
  
  await characteristic.subscribeAsync()
}