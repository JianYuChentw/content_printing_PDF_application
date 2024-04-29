const UsingMedicines = require('../service/usingMedicines');
const JsonFileHandler = require('../service/jsonFileHandler');
const path = require('path');
const dataFileName = 'usingMedicines.json'; //檔案名稱
const dataFilePath = path.resolve(__dirname, '..', 'save', dataFileName);
const fileHandler = new JsonFileHandler(dataFilePath);




/**
 * 新增項目
 * @param{ object } newData
 * @return { object } nowData
 */
async function createData(newData) {
    try {
        const readJson = await fileHandler.read();
        const usingMedicines = new UsingMedicines(readJson);
        const nowData = await usingMedicines.addData(newData);
        if(!nowData.status){
            return false
        }else{
            await fileHandler.write(nowData.nowData);
            return true
        }
        
    } catch (error) {
        console.error('新增項目發生錯誤', error);
    }
}


/**
 * 讀取所有項目名稱
 * @returns {Promise<Array<string>>}
 */

async function readAllName() {
    try {
        const readJson = await fileHandler.read();
        const usingMedicines = new UsingMedicines(readJson);
        const allName= usingMedicines.getAllDataNames()
        return allName;
    } catch (error) {
        console.error('讀取項目名稱發生錯誤', error);
    }
}

/**
 * 讀取指定名稱項目
 * @param { string} name 項目名稱
 * @returns {Promise<object<string>>}
 */
async function readDataByName(name) {
    try {
        const readJson = await fileHandler.read();
        const usingMedicines = new UsingMedicines(readJson);
        const data = await usingMedicines.getDataByName(name);
        return data
    } catch (error) {
        console.error('讀取指定名稱項目發生錯誤', error);
    }
}

/**
 * 更新指定項目
 * @param { string } name
 * @param { object } newData
 */
async function updateDataByName(name, upData) {
    try {
        const readJson = await fileHandler.read();
        const usingMedicines = new UsingMedicines(readJson); 
        const newData = await updateDataByNameAndOldData(name, upData, usingMedicines.data)
        await fileHandler.write(newData);
    } catch (error) {
        console.error('更新指定名稱項目發生錯誤', error);
    }
}


/**
 * 移除指定項目
 * @param {string} name 
 */
async function removeDataByName(name) { 
    try {
        const readJson = await fileHandler.read();
        const usingMedicines = new UsingMedicines(readJson); 
        const upData = await usingMedicines.removeDataByName(name);
        const newData = await updateDataByNameAndOldData(name, upData, usingMedicines.data)
        await fileHandler.write(newData);
        
    } catch (error) {
        console.error('移除指定名稱項目發生錯誤', error);
    }
}


function updateDataByNameAndOldData(name, newData, oldData) {
    const newDataArray = oldData.map(item => {
        if (item.dataName === name) {
            return { 
                ...item,
                content1: { ...newData.content1 }, // 更新 content1
                content2: { ...newData.content2 }, // 更新 content2
                content3: { ...newData.content3 }, // 更新 content3
                content4: { ...newData.content4 }, // 更新 content4
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
}