const UsingMedicines = require('../service/usingMedicines');
const JsonFileHandler = require('../service/jsonFileHandler');
const dataFile = 'save/usingMedicines.json';
const fileHandler = new JsonFileHandler(dataFile);


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
        await fileHandler.write(nowData);
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
async function updateDataByName(name, newData) {
    try {
        const readJson = await fileHandler.read();
        const usingMedicines = new UsingMedicines(readJson); 
        const [data] = await usingMedicines.updateDataByName(name, newData);
        await fileHandler.write(data);
    } catch (error) {
        console.error('更新指定名稱項目發生錯誤', error);
    }
}



async function removeDataByName(name) { 
    try {
        const readJson = await fileHandler.read();
        const usingMedicines = new UsingMedicines(readJson); 
        const [data] = await usingMedicines.removeDataByName(name);
        await fileHandler.write(data);
        
    } catch (error) {
        console.error('移除指定名稱項目發生錯誤', error);
    }
}




const testD =  [
    {
        "dataName": "test1",
        "content1": {
            "content1_1": "不會吧",
            "content1_2": "",
            "content1_3": "",
            "content1_4": "",
            "content1_5": ""
        },
        "content2": {
            "content2_1": "-",
            "content2_2": "",
            "content2_3": "",
            "content2_4": "",
            "content2_5": ""
        },
        "content3": {
            "content3_1": "-",
            "content3_2": "",
            "content3_3": "",
            "content3_4": "",
            "content3_5": ""
        },
        "content4": {
            "content4_1": "-",
            "content4_2": "",
            "content4_3": "",
            "content4_4": "",
            "content4_5": ""
        }
    },
    {
        "dataName": "test2",
        "content1": {
            "content1_1": "-",
            "content1_2": "123",
            "content1_3": "1231",
            "content1_4": "",
            "content1_5": ""
        },
        "content2": {
            "content2_1": "-",
            "content2_2": "",
            "content2_3": "",
            "content2_4": "",
            "content2_5": ""
        },
        "content3": {
            "content3_1": "123123-",
            "content3_2": "",
            "content3_3": "",
            "content3_4": "123123",
            "content3_5": ""
        },
        "content4": {
            "content4_1": "123123-",
            "content4_2": "",
            "content4_3": "",
            "content4_4": "",
            "content4_5": "123123"
        }
    }
]


removeDataByName('test1')




