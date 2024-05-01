const customerManager= require('../service/historyCustomer')

/**
 * 新增項目
 * @param { object } newData
 * @return { boolean } 
 */
async function createData(newData) {
    try {
        const nowData = await customerManager.addData(newData);
        if(!nowData){
            return false
        }else{
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
    const allName = await customerManager.getAllDataNames();
    const indexOfDash = allName.indexOf('-');
    if (indexOfDash !== -1) {
      allName.splice(indexOfDash, 1); // 移除 '-'
      allName.unshift('-'); // 将 '-' 插入到数组的第一个位置
    }
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

        const data = await customerManager.getDataByName(name);
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
        const newData = await customerManager.updateDataByName(name, upData)
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
        const upData = await customerManager.removeDataByName(name);

    } catch (error) {
        console.error('移除指定名稱項目發生錯誤', error);
    }
}




module.exports = {
    createData,
    readAllName,
    readDataByName,
    updateDataByName,
    removeDataByName,
}