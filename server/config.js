const router = require("./router");
module.exports = {
    // FTP server configuration
    ftpPort: 21, // The default FTP port is 21. Consider using a non-standard port for added security.
    ftpHost: '192.168.1.62', // Listen on all interfaces. Adjust according to your network setup.

    // Target computer configuration
    targetComputerIP: '192.168.1.44', // IP address of the target computer in the local network
    targetComputerPort: 3000, // Port on which the target computer is listening for incoming files

    // Other configurations
    // Add additional configurations as necessary, such as security settings or logging preferences.
};
