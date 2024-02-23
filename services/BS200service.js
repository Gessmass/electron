const {SerialPort, ReadlineParser} = require('serialport')

const port = new SerialPort({path:'/dev/tty.Bluetooth-Incoming-Port', baudRate: 9600 })

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
console.log("BS200service.js")
parser.on('data', (data) => {
  console.log('Data received :', data)
  
  const parsedData = parseScaleData(data)
  console.log('Parsed data :', parsedData)
})


function parseScaleData(dataString) {
  // Convertissez la chaîne hexadécimale en octets
  const bytes = Buffer.from(dataString, 'hex');
  
  // Analysez chaque partie des données selon leur format
  const deviceType = bytes[0]; // Premier octet pour le type d'appareil
  const impedance = bytes.readUInt16BE(1) * 0.1; // Octets 2-3 pour l'impédance
  const weight = bytes.readUInt16BE(3) * 0.01; // Octets 4-5 pour le poids
  // Continuez pour les autres champs selon votre besoin
  
  return { deviceType, impedance, weight };
}
