const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const routeNamespace = io.of('/routeManagement');

let receiverECG = null
let receiverAfinion = null

const userSocketMap = {}

routeNamespace.on('connection', (socket) => {
    const deviceAddress = socket.handshake.address

    console.log('Connected user : ', deviceAddress)
    userSocketMap[deviceAddress] = socket.id //* Assigne l'adresse de l'ordi à son numéro de connection socket unique pour la session

    socket.join('ECF')
    socket.join('AFINION')

    socket.on('requestAssignment', (data) => {
        const remoteDevice = data.body
        const computer = deviceAddress

        if (remoteDevice === "ECG") {
            receiverECG = computer //* assign l'IP de l'ordi qui veut recevoir les datas du device via le TCP
            socket.to(remoteDevice).emit('assignmentLost', remoteDevice) //* notifie les sockets de la room portant le nom du device concerné qu'ils ne sont plus assignés
            console.log(`Device ${remoteDevice} assigned to ${computer}`)
        } else if (remoteDevice === "AFINION") {
            receiverAfinion = computer
            socket.to(remoteDevice).emit('assignmentLost', remoteDevice)
            console.log(`Device ${remoteDevice} assigned to ${computer}`)
        } else {
            console.log('No device on the local network')
        }
    })

    socket.on('tcp ecg data', data, deviceName => {
        console.log("data from tcp", data, deviceName)
    })

    socket.on('disconnect', () => {
        delete userSocketMap[deviceAddress]
        console.log(deviceAddress, "disconnected")
    })
});

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

const sendDataToComputer = (data, computer) => {
    console.log(data, computer)
}


server.listen(3000, () => console.log('IO Server listening on port 3000'));

module.exports = sendDataToComputer