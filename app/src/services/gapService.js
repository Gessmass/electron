/*import { connect, writeCmd } from "./serial.js";


const portPath = '/dev/tty.usbmodem4048FDEAE9841'
const notiID = '000f'
const deviceToConnect = '[0]1E:20:0B:07:A6:71'
const authorizedDevices = ['[0]1E:20:0B:07:A6:71', '[0]FF:23:02::07:00:43']
const connectedDevices = []


export const requestPort = async () => {
    await connect()

    await writeCmd('CENTRAL')
    await writeCmd(`GAPCONNECT=${deviceToConnect}`)
}

 */