const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('view/index.html');
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('frontend-message', (event, arg) => {
    console.log(`Received message from frontend: ${JSON.stringify(arg)}`);
    event.reply('backend-reply', 'Hello from backend!');
  });
});