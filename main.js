const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const pdfFormat = require('./pdfFormat/app');
const usingMedicines = require('./controller/usingMedicines');
const historyCustomer = require('./controller/historyCustomer');  // 引入客戶相關的模組


const iconPath = path.join(__dirname, 'view/icon/work_64.png');
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        icon: iconPath,
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('view/index.html');
}

app.whenReady().then(() => {
    createWindow();

    ipcMain.on('frontend-message', async (event, jsonData) => {
        try {
            const data = JSON.parse(jsonData);
            await pdfFormat.createPDFDocument(data, app.getPath('desktop'));
        } catch (error) {
            console.error('Error parsing JSON or creating PDF:', error);
            event.reply('error', 'Failed to create PDF: ' + error.message);
        }
    });

    ipcMain.on('load-names', async (event) => {
      try {
        const names = await usingMedicines.readAllName();
        event.reply('names-loaded', names);
      } catch (error) {
        console.error('Error fetching names:', error);
        event.reply('names-loaded', []);
      }
    });

    ipcMain.on('get-details-by-name', async (event, name) => {
        try {
            const details = await usingMedicines.readDataByName(name);
            event.reply('details-by-name-result', details);
        } catch (error) {
            console.error('Error fetching details:', error);
            event.reply('details-by-name-result', { error: 'Failed to fetch details' });
        }
    });

    ipcMain.on('save-details', async (event, { name, details }) => {
        try {
            await usingMedicines.updateDataByName(name, details);
            event.reply('save-result', '保存成功');
        } catch (error) {
            console.error('Error saving details:', error);
            event.reply('save-result', `保存失败: ${error.message}`);
        }
    });

    ipcMain.on('remove-details', async (event, { name }) => {
        try {
            await usingMedicines.removeDataByName(name);
            event.reply('remove-result', '刪除成功');
        } catch (error) {
            console.error('Error saving details:', error);
            event.reply('remove-result', `刪除失败: ${error.message}`);
        }
    });

    ipcMain.on('createCombination', async (event, {details }) => {
        try {
            const createResult = await usingMedicines.createData(details);
            if (!createResult) {
                event.reply('createCombination', '新增失敗');
            } else {
                event.reply('createCombination', '新增成功'); 
            }
        } catch (error) {
            console.error('Error saving details:', error);
            event.reply('createCombination', `新增失败: ${error.message}`);
        }
    });

    // 添加客戶相關的 IPC 事件處理
    ipcMain.on('loadCustomerNames', async (event) => {
        try {
            const names = await historyCustomer.readAllName();
            event.reply('customerNames-loaded', names);
        } catch (error) {
            console.error('Error fetching customer names:', error);
            event.reply('customerNames-loaded', []);
        }
    });

    ipcMain.on('get-cli-details-by-name', async (event, name) => {
        try {
            
            const details = await historyCustomer.readDataByName(name);
            event.reply('details-cli-by-name-result', details);
        } catch (error) {
            console.error('Error fetching customer details:', error);
            event.reply('details-cli-by-name-result', { error: 'Failed to fetch details' });
        }
    });

    ipcMain.on('save-cli-details', async (event, { name, details }) => {
        try {
            await historyCustomer.updateDataByName(name, details);
            event.reply('save-cli-result', '保存成功');
        } catch (error) {
            console.error('Error saving customer details:', error);
            event.reply('save-cli-result', `保存失败: ${error.message}`);
        }
    });

    ipcMain.on('remove-cli-details', async (event, { name }) => {
        try {
            await historyCustomer.removeDataByName(name);
            event.reply('remove-cli-result', '刪除成功');
        } catch (error) {
            console.error('Error removing customer details:', error);
            event.reply('remove-cli-result', `刪除失败: ${error.message}`);
        }
    });

    ipcMain.on('createCli', async (event, { details }) => {
        try {
            const createResult = await historyCustomer.createData(details);
            if (!createResult) {
                event.reply('createCli', '新增失敗');
            } else {
                event.reply('createCli', '新增成功');
            }
        } catch (error) {
            console.error('Error creating customer:', error);
            event.reply('createCli', `新增失败: ${error.message}`);
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
