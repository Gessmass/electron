export const deviceTest = async () => {
  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true
  }).then((device) => {
    console.log(device)
  }).catch((error) => {
    console.log(error)
  })
}