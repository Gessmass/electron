// Import necessary libraries
const net = require('net');
const fs = require('fs');
const path = require('path');
const { targetComputerPort, targetComputerIP } = require('./config');

/**
 * Sends a file to the target computer via TCP.
 * @param {string} fileName - The name of the file to send.
 * @param {Object} ftpConnection - The FTP connection object for logging.
 */
const routeFile = (fileName, ftpConnection) => {

    fs.readFile(fileName, (err, data) => {
        if (err) {
            console.log(err)
            return;
        }

        const client = new net.Socket();
        client.connect(targetComputerPort, targetComputerIP, () => {
            console.info(`Connected to target computer: ${targetComputerIP}:${targetComputerPort}`);
            client.write(data);
        });

        client.on('data', (data) => {
            console.info(`Received confirmation from target computer: ${data.toString()}`);
            client.destroy(); // kill client after server's response

            // Optionally, delete the file after successful transmission
            fs.unlink(fileName, (err) => {
                if (err) console.error(`Error deleting file ${fileName}:`, err);
                else console.info(`Successfully deleted file ${fileName}`);
            });
        });

        client.on('close', () => {
            console.info('Connection to target computer closed');
        });

        client.on('error', (err) => {
            console.error('Connection error to target computer:', err);
        });
    });
}

module.exports = { routeFile };
