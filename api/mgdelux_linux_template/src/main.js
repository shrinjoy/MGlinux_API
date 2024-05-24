const { app, BrowserWindow, ipcMain, shell } = require('electron');
const { exec } = require('child_process');
const os = require('os');
const fs = require('fs');
const path = require('node:path');
const getmac = require('getmac');
var internetAvailable = require("internet-available");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: '../icons/icon.ico',
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // mainWindow.loadURL('http://193.203.163.194:8082/');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  // if (isFirstStartup()) {
  //   driverInstallation();
  //   setFirstStartupFlag();
  // }

  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Start app on windows startup 
// app.setLoginItemSettings({
//   openAtLogin: true    
// })

// System Commands from App
ipcMain.on('quit-app', () => {
  app.quit();
});

ipcMain.on('system-shutdown', () => {
  if (os.platform() === 'win32') {
    exec('shutdown /s /t 0');
  } else {
    exec('shutdown +0');
  }
});

ipcMain.on('system-restart', () => {
  if (os.platform() === 'win32') {
    exec('shutdown /r /t 0');
  } else {
    exec('shutdown -r now');
  }
});

ipcMain.on('print-driver-settings', () => {
  if (os.platform() === 'win32') {
    shell.openPath('/home/driver/');
  } else {
    exec('gnome-terminal -- /usr/share/autodriver/autoprinter.sh');
  }
});

ipcMain.on('system-settings', () => {
  if (os.platform() === 'win32') {
    exec('start ms-settings:');
  } else {
    exec('gnome-control-center');
  }
});


// Deriving User Mac ID
ipcMain.handle('get-mac-address', fetchMacAddress)

async function fetchMacAddress() {
  const macAddress = await getmac.default();
  if (macAddress) {
    return macAddress;
  }
}

// Printing Focus Window
ipcMain.handle('print-focus-window', printFocusWindow)

var options = {
  silent: false,
  printBackground: true,
  color: false,
  margin: {
    marginType: 'printableArea'
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
}

async function printFocusWindow() {
  let win = BrowserWindow.getFocusedWindow();
  win.webContents.print(options, (success, failureReason) => {
    if (!success) {
      console.log(failureReason)
    } else {
      console.log('Print Start');
    }
  })
}

// Check Internet Function
ipcMain.handle('check-internet', async () => {
  return await internetChecker();
})

async function internetChecker() {
  try {
    await internetAvailable({
      timeout: 4000,
      retries: 10,
    });
    return true;
  }
  catch (error) {
    return false
  }
}

// const flagFilePath = path.join(app.getPath('userData'), 'first-run-flag.txt');

// // Virgin Flag Checker
// function isFirstStartup() {
//   return !fs.existsSync(flagFilePath);
// }
// // Hoe Flag Setter
// function setFirstStartupFlag() {
//   fs.writeFileSync(flagFilePath, 'This file indicates that the app is not a virgin.', 'utf8');
// }

// // Function for Virgins Only
// function driverInstallation() {
//   console.log('Driver Install');
// }



