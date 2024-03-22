const net = require('net');
const sendDataToComputer = require("./io");


const tcpServer = net.createServer((socket) => {
    const clientIP = socket.remoteAddress

    console.log("Client connected to TCP : ", clientIP)

    socket.on('ready', () => {
        console.log('Socket ready')
    })

    socket.on('data', (data) => {
        if (data.toString().trim() === "") return;
        console.log(`From TCP: ${data}`);

        sendDataToComputer(data.toString(), clientIP)
    });

    socket.on("end", () => {
        console.log(`Client ${clientIP} ends transmition to TCP`)
    });
});

tcpServer.listen(21, () => console.log('TCP Server listening on port 21'));
