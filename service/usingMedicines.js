const { app } = require('electron');
const path = require('path');
const fs = require('fs');
const Datastore = require('nedb');

// 获取用户数据目录路径
const userDataPath = app.getPath('userData');
const databaseFolderPath = path.join(userDataPath, 'service', 'database');
const databaseFilePath = path.join(databaseFolderPath, 'app_UMdatabase.db');
console.log('UM',databaseFilePath);
// 确保数据库文件夹存在，如果不存在则创建
if (!fs.existsSync(databaseFolderPath)) {
  fs.mkdirSync(databaseFolderPath, { recursive: true });
}

// 创建数据库实例
const db = new Datastore({ filename: databaseFilePath, autoload: true });

// 初始化数据库
function initDatabase() {
  db.ensureIndex({ fieldName: 'dataName', unique: true }, function (err) {
    if (err) {
      console.error('連線發生錯誤:', err);
    } else {
      console.log('連線成功！');
      // 插入默认数据
      db.findOne({ dataName: '-' }, function (err, doc) {
        if (err) {
          console.error('建立預設資料庫發生錯誤:', err);
        } else if (!doc) {
          db.insert(defaultData, function (err, newDoc) {
            if (err) {
              console.error('Error inserting default data:', err);
            } else {
              console.log('Default data inserted successfully:', newDoc);
            }
          });
        }
      });
    }
  });
}

// 默认数据
const defaultData = {
  "dataName": "-",
  "content1": {
    "content1_1": "",
    "content1_2": "",
    "content1_3": "",
    "content1_4": "",
    "content1_5": ""
  },
  "content2": {
    "content2_1": "",
    "content2_2": "",
    "content2_3": "",
    "content2_4": "",
    "content2_5": ""
  },
  "content3": {
    "content3_1": "",
    "content3_2": "",
    "content3_3": "",
    "content3_4": "",
    "content3_5": ""
  },
  "content4": {
    "content4_1": "",
    "content4_2": "",
    "content4_3": "",
    "content4_4": "",
    "content4_5": ""
  }
};

// 初始化数据库
initDatabase();



const usingMedicines= {
  db: db,

  init() {
      this.db.ensureIndex({ fieldName: 'dataName', unique: true }, function (err) {
          if (err) {
              console.error('Error creating index:', err);
          } else {
              console.log('有的');
          }
      });
  },

  addData(newData) {
      return new Promise((resolve, reject) => {
          this.db.insert(newData, (err, doc) => {
              if (err) {
                  reject(false); // 返回 false 表示失败
              } else {
                  resolve(true); // 返回 true 表示成功
              }
          });
      });
  },

  removeDataByName(name) {
      return new Promise((resolve, reject) => {
          this.db.remove({ dataName: name }, { multi: false }, (err, numRemoved) => {
              if (err) {
                  reject(err);
              } else if (numRemoved === 0) {
                  reject(`No data found with dataName '${name}'.`);
              } else {
                  resolve(`Data with dataName '${name}' removed successfully.`);
              }
          });
      });
  },

  updateDataByName(name, newData) {
      return new Promise((resolve, reject) => {
          this.db.update({ dataName: name }, { $set: newData }, { multi: false }, (err, numUpdated) => {
              if (err) {
                  reject(err);
              } else if (numUpdated === 0) {
                  reject(`No data found with dataName '${name}'.`);
              } else {
                  resolve(`Data with dataName '${name}' updated successfully.`);
              }
          });
      });
  },

  getAllDataNames() {
      return new Promise((resolve, reject) => {
          this.db.find({}, { dataName: 1, _id: 0 }, (err, docs) => {
              if (err) {
                  reject(err);
              } else {
                  const dataNames = docs.map(doc => doc.dataName);
                  resolve(dataNames);
              }
          });
      });
  },

  getDataByName(name) {
      return new Promise((resolve, reject) => {
          this.db.findOne({ dataName: name }, (err, doc) => {
              if (err) {
                  reject(err);
              } else if (!doc) {
                  reject(`No data found with dataName '${name}'.`);
              } else {
                  resolve(doc);
              }
          });
      });
  }
};





module.exports = usingMedicines
