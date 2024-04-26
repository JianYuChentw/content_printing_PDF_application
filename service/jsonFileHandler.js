const fs = require('fs').promises;
const path = require('path');

class JsonFileHandler {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async read() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`無法讀取或解析 JSON 文件 ${this.filePath}: ${error}`);
    }
  }

  async write(data) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log('資料已成功寫入檔案');
    } catch (error) {
      throw new Error(`寫入檔案時發生錯誤: ${error}`);
    }
  }
}

module.exports = JsonFileHandler;
