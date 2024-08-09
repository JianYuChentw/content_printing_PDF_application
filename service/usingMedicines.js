
class UsingMedicines {
  constructor(data) {
    this.data = data;
  }

  addData(newData) {
    // 檢查新增資料的 dataName 是否已存在於現有資料中
    const isDuplicate = this.data.some(item => item.dataName === newData.dataName);
    if (isDuplicate) {
        console.error(`新增資料的 dataName "${newData.dataName}" 已存在，請使用其他 dataName。`);
        return {nowData:this.data,status:false}; // 不執行新增動作，直接返回原始資料
    } else {
        this.data.push(newData); // 若 dataName 不重複，則新增資料
        return {nowData:this.data,status:true};
    }
  }

  removeDataByName(name) {
    const index = this.data.findIndex(item => item.dataName === name);
    if (index !== -1) {
      this.data.splice(index, 1);
      return this.data;
    } else {
      console.error(`未找到名稱為 ${name} 的數據`);
      return null;
    }
  }

  updateDataByName(name, newData) {
    const index = this.data.findIndex(item => item.dataName === name);
    if (index !== -1) {
      this.data[index] = newData;
      return this.data;
    } else {
      console.error(`未找到名稱為 ${name} 的數據`);
      return null;
    }
  }

  getAllDataNames() {
    return this.data.map(item => item.dataName);
  }

  getDataByName(name) {
    const foundItem = this.data.find(item => item.dataName === name);
    return foundItem ? foundItem : null;
  }
}

module.exports = UsingMedicines;
