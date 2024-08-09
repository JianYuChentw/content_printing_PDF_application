const HistoryCustomer = require('../service/historyCustomer');
const JsonFileHandler = require('../service/jsonFileHandler');
// const path = require('path');
// const utils = require('../utils')
// const dataFileName = 'historyCustomer.json'; // 檔案名稱
// const dataFilePath = path.resolve(__dirname, '..', 'save', dataFileName);
// const fileHandler = new JsonFileHandler(utils.saveDataFilePath(dataFileName));
const fs = require('fs');
const path = require('path');
const electron = require('electron');
const app = electron.app || electron.remote.app;

const dataFileName = 'historyCustomer.json';
const isDev = !app.isPackaged;
const basePath = isDev ? path.resolve(__dirname, '../save') : app.getPath('userData');
// const savePath = path.join(basePath, 'save');
const dataFilePath = path.join(basePath, dataFileName);
const fileHandler = new JsonFileHandler(dataFilePath);


// 檢查並創建資料夾和文件
if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
}

if (!fs.existsSync(dataFilePath)) {
    const defaultDataFilePath = path.resolve(__dirname, '../save', dataFileName);
    const data = fs.existsSync(defaultDataFilePath) ? fs.readFileSync(defaultDataFilePath, 'utf8') : JSON.stringify([]);
    fs.writeFileSync(dataFilePath, data, 'utf8');
}


/**
 * 新增客戶
 * @param {object} newData
 * @return {object} nowData
 */
async function createData(newData) {
    try {
        const readJson = await fileHandler.read();
        const historyCustomer = new HistoryCustomer(readJson);
        const nowData = await historyCustomer.addData(newData);
        if (!nowData.status) {
            return false;
        } else {
            await fileHandler.write(nowData.nowData);
            return true;
        }
    } catch (error) {
        console.error('新增客戶發生錯誤', error);
    }
}

/**
 * 讀取所有客戶名稱
 * @returns {Promise<Array<string>>}
 */
async function readAllName() {
    try {
        const readJson = await fileHandler.read();
        const historyCustomer = new HistoryCustomer(readJson);
        const allName = historyCustomer.getAllDataNames();
      
        return allName;
    } catch (error) {
        console.error('讀取客戶名稱發生錯誤', error);
    }
}

/**
 * 讀取指定名稱客戶
 * @param {string} name 客戶名稱
 * @returns {Promise<object<string>>}
 */
async function readDataByName(name) {
    try {
        const readJson = await fileHandler.read();
        const historyCustomer = new HistoryCustomer(readJson);
        const data = await historyCustomer.getDataByName(name);
        return data;
    } catch (error) {
        console.error('讀取指定名稱客戶發生錯誤', error);
    }
}

/**
 * 更新指定客戶
 * @param {string} name
 * @param {object} newData
 */
async function updateDataByName(name, upData) {
    try {
        const readJson = await fileHandler.read();
        const historyCustomer = new HistoryCustomer(readJson);
        const newData = await updateDataByNameAndOldData(name, upData, historyCustomer.data);
        await fileHandler.write(newData);
    } catch (error) {
        console.error('更新指定名稱客戶發生錯誤', error);
    }
}

/**
 * 移除指定客戶
 * @param {string} name
 */
async function removeDataByName(name) {
    try {
        const readJson = await fileHandler.read();
        const historyCustomer = new HistoryCustomer(readJson);
        const upData = await historyCustomer.removeDataByName(name);
        const newData = await updateDataByNameAndOldData(name, upData, historyCustomer.data);
        await fileHandler.write(newData);
    } catch (error) {
        console.error('移除指定名稱客戶發生錯誤', error);
    }
}

function updateDataByNameAndOldData(name, newData, oldData) {
    const newDataArray = oldData.map(item => {
        if (item.dataName === name) {
            return {
                ...item,
                ...newData
            };
        } else {
            return item;
        }
    });
    return newDataArray;
}

module.exports = {
    createData,
    readAllName,
    readDataByName,
    updateDataByName,
    removeDataByName,
    updateDataByNameAndOldData
};
