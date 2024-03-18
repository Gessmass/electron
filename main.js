const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
const {Worker, parentPort} = require('worker_threads')
const noble = require("@abandonware/noble");


const isMac = process.platform === 'darwin';

if (require('electron-squirrel-startup')) app.quit();

const handleSquirrelEvent = () => {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = (command, args) => {
    let spawnedProcess;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = (args) => {
    return spawn(updateDotExe, args);
  };

  const runUpdateExe = (arguments) => {
    try {
      spawn(updateDotExe, arguments, { detached: true }).on('close', () => app.quit());
    } catch (error) {
      console.error('Failed to start process', error);
    }
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add desktop shortcuts
      // - Add start menu shortcuts
      runUpdateExe(['--createShortcut', exeName, '--shortcut-locations', 'Desktop']);
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the '--squirrel-install' and
      // '--squirrel-updated' handlers

      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // '--squirrel-updated'

      app.quit();
      return true;
  }

  return false;
};

if (process.argv.length >= 2) {
  const squirrelEvent = process.argv[1];
  if (handleSquirrelEvent(squirrelEvent)) return;
}

if (handleSquirrelEvent()) {
  return;
}

let mainWindow;
let bluetoothWorker

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableBlinkFeatures: "WebBluetooth",
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js")
    }
  });

  const startUrlProd = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, 'app/build/index.html')}`;
  
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL(startUrlProd);
};

app.commandLine.appendSwitch("enable-experimental-web-platform-features", "true");
app.commandLine.appendSwitch("enable-web-bluetooth", "true");

app.whenReady().then(createWindow);



bluetoothWorker = new Worker('./services/bluetoothService.js');

bluetoothWorker.on('message', (message) => {
  if (message.type === 'bluetooth-unsupported') {
    mainWindow.webContents.send('bluetooth-unsupported', message.data)
  }
})

bluetoothWorker.on('message', (message) => {
  if (message.type === 'device-discovered') {
    mainWindow.webContents.send('bluetooth-device-discovered', message.data)
    console.log("device discovered :", message.data.name)
  }
});

ipcMain.on('start-bluetooth-scan', (event) => {
  bluetoothWorker.postMessage('startScan')
})



app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

app.on('ready', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
