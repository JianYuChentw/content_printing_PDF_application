const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const pdfFormat = require('./pdfFormat/app')
const desktopPath = app.getPath('desktop'); //固定儲存桌面路徑



const iconPath = path.join(__dirname, 'view/icon/work_64.png');
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: iconPath,
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

  ipcMain.on('frontend-message', async(event, jsonData) => {
    const data = JSON.parse(jsonData)

    await pdfFormat.createPDFDocument(data,desktopPath)

  });
});