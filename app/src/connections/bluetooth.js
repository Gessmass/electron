export const getBluetoothDevice = async () => {
  console.log("ca marche")
  try {
    await navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    })
  } catch (error) {
    console.log(error)
  }
}