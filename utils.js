const path = require('path');

function saveDataFilePath(dataFileName) {
  const dataFilePath = path.resolve(__dirname,'..save', dataFileName);
  console.log(dataFilePath);
  return dataFilePath;
}

module.exports = { 
    saveDataFilePath, 
    };
