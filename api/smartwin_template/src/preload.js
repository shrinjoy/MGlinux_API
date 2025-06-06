// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    quitApp: () => {
        ipcRenderer.send('quit-app');
    },
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    systemShutdown: () => {
        ipcRenderer.send('system-shutdown');
    },
    systemRestart: () => {
        ipcRenderer.send('system-restart');
    },
    systemSettings: () => {
        ipcRenderer.send('system-settings');
    },
    printDriver: () => {
        ipcRenderer.send('print-driver-settings');
    },
    getMacAddress: () => ipcRenderer.invoke('get-mac-address'),
    printFocusWindow: () => ipcRenderer.invoke('print-focus-window'),
    checkInternet: () => ipcRenderer.invoke('check-internet'),
    backToHome: () => ipcRenderer.send('navigate-back-to-app'),
    getCurrentURL: () => ipcRenderer.invoke('get-current-url'),
    checkHardMac: () => ipcRenderer.invoke('check-mac'),
    saveCredentials: (username, password, usermacid) => ipcRenderer.invoke('save-credentials', { username, password, usermacid }),
    fetchCredentials: () => ipcRenderer.invoke('fetch-credentials'),
    deleteCredentials: () => ipcRenderer.invoke('delete-credentials'),
});

