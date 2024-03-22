const server = require('http').createServer();
const fs = require('fs')

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const routeNamespace = io.of('/routeManagement');

let receiverECG = null; // ID de socket pour l'ordinateur recevant des données ECG
let receiverAfinion = null; // ID de socket pour l'ordinateur recevant des données Afinion

const userSocketMap = {};

routeNamespace.on('connection', (socket) => {
    const deviceAddress = socket.handshake.address;

    console.log('Connected user : ', deviceAddress);
    userSocketMap[deviceAddress] = socket.id;

    socket.join('ECG');
    socket.join('AFINION');

    socket.on('requestAssignment', (data) => {
        const remoteDevice = data.body;
        console.log(data)
        const computerSocketId = userSocketMap[deviceAddress]; // Utilisez l'ID de socket

        if (remoteDevice === "ECG") {
            receiverECG = computerSocketId;
            socket.to('ECG').emit('assignmentLost', remoteDevice);
            console.log(`Device ${remoteDevice} assigned to ${deviceAddress}`);
        } else if (remoteDevice === "AFINION") {
            receiverAfinion = computerSocketId;
            socket.to('AFINION').emit('assignmentLost', remoteDevice);
            console.log(`Device ${remoteDevice} assigned to ${deviceAddress}`);
        } else {
            console.log('No device on the local network');
        }
    });

    socket.on('disconnect', () => {
        delete userSocketMap[deviceAddress];
        console.log(deviceAddress, "disconnected");
    });
});

const sendDataToComputer = (filePath) => {

    fs.readFile(filePath, (err, data) => {
        console.log(data)
        
        if (err) {
            console.error('Error reading the PDF file', err);
            return;
        }

        routeNamespace.emit('fileTransfert', data);
    });
}

io.of("/routeManagement").adapter.on("create-room", (room) => {
    console.log(`room ${room} was created`);
});

io.of("/routeManagement").adapter.on("join-room", (room, id) => {
    console.log(`socket ${id} has joined room ${room}`);
});

io.of("/routeManagement").adapter.on("delete-room", (room) => {
    console.log(`room ${room} was deleted`);
});

io.of("/routeManagement").adapter.on("leave-room", (room, id) => {
    console.log(`socket ${id} has leaving room ${room}`);
});

server.listen(3000, () => console.log('IO Server listening on port 3000'));

module.exports = sendDataToComputer