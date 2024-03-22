const FtpSrv = require('ftp-srv')
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const sendDataToComputer = require("./io");
const router = require("./router");


const hostname = '192.168.1.62'
const port = 21

const ftpServer = new FtpSrv({
    url: `ftp://${hostname}:${port}`,
    pasv_url: hostname,
    greeting: ["Welcome to the FTP server"],
    tls: false
})

const filesDir = path.join(__dirname, 'received_files')

if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true })
}

ftpServer.on('login', ({ connection }, resolve) => {
    console.log('Client connected', connection.ip);

    // Setup directory and file upload handling
    const remotePath = '/uploads'; // Define a path for uploads

    connection.on('STOR', (error, fileName) => {
        if (error) {
            console.error(`Failed to store file: ${fileName}`, error);
            return;
        }
        console.log(`File received: ${fileName}`);
        // Handle file routing to the specified computer on the local network
        router.routeFile(fileName, connection);
        
    });

    // Resolve with the user's file system root and permissions
    resolve({ root: filesDir });
});


ftpServer.listen()
        .then(() => {
            console.log(`FTP Server running at ftp://${hostname}:${port}/`);
        });