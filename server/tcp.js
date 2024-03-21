const net = require('net');
const sendDataToComputer = require("./io");
const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const tcpServer = net.createServer((socket) => {
    socket.on('data', (data) => {
        if (data.toString().trim() === "") return;
        console.log(`Received data: ${data}`);

        sendDataToComputer(data.toString(), socket.localAddress)
    });

    socket.on("end", () => {
        console.log("Client ends transmission")
    });
});

tcpServer.listen(8080, () => console.log('TCP Server listening on port 8080'));

