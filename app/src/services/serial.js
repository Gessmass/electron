import * as my_dongle from 'bleuio'

export const scanDevices = async () => {
    console.log("scanDevices()")
    await my_dongle.at_connect() //* sends 'select-serial-port' event to main process
    await my_dongle.at_central()
    my_dongle.at_gapscan(3)
            .then((data) => {
                console.log(data)
            })
}