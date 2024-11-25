const { app, BrowserWindow, ipcMain, shell, globalShortcut, dialog } = require("electron");
const { exec } = require("child_process");
const os = require("os");
const fs = require("fs");
const path = require("node:path");
const getmac = require("getmac");
var internetAvailable = require("internet-available");
var serialNumber = require("serial-number");
import Store from "electron-store";
serialNumber.preferUUID = true;
const isProduction = 1;

const store = new Store();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: "../icons/icon.ico",
    show: false,
    frame: false,
    titleBarStyle: 'hidden', // watch this line
    fullscreen: true,
    webPreferences: {
      zoomFactor: 1.0,
      nodeIntegration: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      devTools: !app.isPackaged,
    },
  });

  // and load the index.html of the app.

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // mainWindow.loadURL('http://77.37.47.190:8084/');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.once("ready-to-show", () => {
    mainWindow.maximize();
    mainWindow.show(); // Show the window after maximizing.
    if (isProduction === 1) {
      mainWindow.setAlwaysOnTop(true);
    }
    mainWindow.focus();
  });
  mainWindow.on("show", () => {
    setTimeout(() => {
      mainWindow.focus();
    }, 200);
  });


  // Back To Home Function
  ipcMain.handle("back-home", async () => {
    return await backToHome();
  });

  async function backToHome() {
    mainWindow.loadURL(
      `file://${path.resolve(
        __dirname,
        "resources/app.asar/.webpack/renderer/main_window/index.html"
      )}#/home`
    );
  }

  // Event listener for the 'maximize' event
  mainWindow.on('focus', () => {
    mainWindow.focus();
    setTimeout(() => {
      if (isProduction === 1) {
        // exec('taskkill /F /IM explorer.exe');
      }
    }, 200)
  });

  // Listen for the minimize-window event
  ipcMain.on('minimize-window', () => {
    if (mainWindow) {
      // exec('explorer.exe', (error, stdout, stderr) =>{
      //   if (stderr || error){
      //     exec('explorer.exe')
      //   } 
      // });
      mainWindow.minimize();
    } else {
      console.warn('Main window is not available.');
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  if (isFirstStartup()) {
    // handleForceMacId();
    setFirstStartupFlag();
  }

  createWindow();

  if (isProduction === 1) {
    // exec('taskkill /F /IM explorer.exe');

    // Register a global shortcut to prevent ALT+TAB
    globalShortcut.register('Alt+Tab', () => {
      console.log('ALT+TAB prevented');
    });

    // Register a global shortcut to prevent CTRL+SHIFT+ESC
    globalShortcut.register('Control+Shift+Escape', () => {
      console.log('CTRL+SHIFT+ESC prevented');
    });

    // Register other combinations as needed
    globalShortcut.register('Control+Alt+Delete', () => {
      console.log('CTRL+ALT+DEL prevented');
    });

    // Register other combinations as needed
    globalShortcut.register('Alt+Control+Delete', () => {
      console.log('ALT+CTRL+DEL prevented');
    });

  }

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
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
ipcMain.on("quit-app", () => {
  if (os.platform() === "win32") {
    // exec('explorer.exe', (error, stdout, stderr) =>{
    //   if (stderr || error){
    //     exec('explorer.exe')
    //   }
    // });
    app.quit();
  }
});

ipcMain.on("system-shutdown", (event) => {
  const mainWindow = BrowserWindow.fromWebContents(event.sender);
  if (os.platform() === "win32") {
    dialog.showMessageBox(mainWindow, {
      type: 'warning',
      title: 'Message',
      message: "Do You Want to Shutdown?",
      buttons: ['Yes', 'No'],
      noLink: true,
      modal: true
    }).then((result) => {
      if (result.response === 0) {
        exec("shutdown /s /t 0");
      }
    });
  } else {
    exec("shutdown +0");
  }
});

ipcMain.on("system-restart", (event) => {
  const mainWindow = BrowserWindow.fromWebContents(event.sender);
  if (os.platform() === "win32") {
    dialog.showMessageBox(mainWindow, {
      type: 'warning',
      title: 'Message',
      message: "Do You Want to Restart?",
      buttons: ['Yes', 'No'],
      noLink: true,
      modal: true
    }).then((result) => {
      if (result.response === 0) {
        exec("shutdown /r /t 0");
      }
    });
  } else {
    exec("shutdown -r now");
  }
});

ipcMain.on("print-driver-settings", () => {
  if (os.platform() === "win32") {
    shell.openPath("/home/driver/");
  } else {
    exec("gnome-terminal -- /usr/share/autodriver/autoprinter.sh");
  }
});

ipcMain.on("system-settings", () => {
  if (os.platform() === "win32") {
    exec("start ms-settings:");
  } else {
    exec("gnome-control-center");
  }
});

// Deriving User Mac ID
ipcMain.handle("get-mac-address", fetchMacAddress);

async function fetchMacAddress() {
  const macAddress = await getmac.default();
  // const macAddress = await getSerialNumber();
  if (macAddress) {
    return macAddress;
  }
}

function getSerialNumber() {
  return new Promise((resolve, reject) => {
    serialNumber((err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}

// Printing Focus Window
ipcMain.handle("print-focus-window", printFocusWindow);

var options = {
  silent: true,
  printBackground: true,
  color: false,
  margin: {
    marginType: "printableArea",
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
};

async function printFocusWindow() {
  let win = BrowserWindow.getFocusedWindow();
  win.webContents.print(options, (success, failureReason) => {
    if (!success) {
      console.log(failureReason);
    } else {
      console.log("Print Start");
    }
  });
}

// Check Internet Function
ipcMain.handle("check-internet", async () => {
  return await internetChecker();
});

async function internetChecker() {
  try {
    await internetAvailable({
      timeout: 1000,
      retries: 2,
    });
    return true;
  } catch (error) {
    return false;
  }
}

ipcMain.handle("get-current-url", () => {
  let win = BrowserWindow.getFocusedWindow();
  return win.webContents.getURL();
});

const flagFilePath = path.join(app.getPath("userData"), "first-run-flag.txt");

// Virgin Flag Checker
function isFirstStartup() {
  return !fs.existsSync(flagFilePath);
}
// Hoe Flag Setter
function setFirstStartupFlag() {
  fs.writeFileSync(
    flagFilePath,
    "This file indicates that the app is not a virgin.",
    "utf8"
  );
}

ipcMain.handle("check-mac", isFirstStartup);

ipcMain.handle("save-credentials", (event, { username, password }) => {
  store.set("username", username);
  store.set("password", password);
})

ipcMain.handle("fetch-credentials", () => {
  const username = store.get("username");
  const password = store.get("password");
  if (!username || !password) {
    return false;
  } else {
    return { username, password };
  }
})
