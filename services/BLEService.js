const { SerialPort } = require('serialport')
const { beginHiddenCallStack } = require("@babel/core/lib/errors/rewrite-stack-trace");
const { ReadLine } = require('readline')

let isConnected = false
let isAdvertising = false

const deviceToConnect = '[0]1E:20:0B:07:A6:71'
const charToNotify = '000f'
const charUUID = '0x2e40'

let readDataArray = []


const writeCommand = (blePort, command) => {
    return new Promise((resolve, reject) => {
        blePort.write('AT+' + command + '\r\n', (err) => {
            if (err) {
                reject(new Error(`Error writing command "${command}": ${err.message}`));
            } else {
                // Attendre un moment pour la réponse ou utiliser un événement spécifique ici
                blePort.once('data', (data) => {
                    resolve(data.toString());
                });
            }
        });
    });
};

const openPort = () => {
    return new Promise((resolve, reject) => {

    })
}

const handleConnect = async (portPath = '/dev/cu.usbmodem4048FDEAE9841') => {
    let blePort;

    try {
        blePort = new SerialPort({
            path: portPath,
            baudRate: 57600,
            autoOpen: false
        });

        if (!blePort.isOpen) {
            blePort.open((err) => {
                if (err) {
                    console.error("Erreur lors de l'ouverture du port : ", err.message);
                } else {
                    console.log("Port ouvert avec succès");
                }
            });
        } else {
            console.log("Le port est déjà ouvert.");
        }

        const centralModeResponse = await writeCommand(blePort, 'CENTRAL');
        console.log('Central Mode Response:', centralModeResponse);

        const dongleStatus = await writeCommand(blePort, 'GAPSTATUS')
        console.log("Gapstatus : ", dongleStatus)

        const findData = await writeCommand(blePort, `FINDSCANDATA=${charUUID}`)
        console.log('Scan data :', findData)


    } catch (err) {
        console.error(`An error occurred: ${err.message}`);
        // Tenter de fermer le port en cas d'erreur
        if (blePort && blePort.isOpen) {
            blePort.close();
        }
    }

    blePort.on('data', (data) => {
        console.log("Data :", data)
    })
};


module.exports = { handleConnect };


// /dev/cu.usbmodem4048FDEAE9841


// cdeacb81-5235-4c07-8846-93a37ee6b86d
// 000f
