const PDFDocument = require('pdfkit');
const { app } = require('electron');
const fs = require('fs');
const path = require('path');

function cmToPoints(cm) {
  const inches = cm / 2.54;
  const points = inches * 72;
  return points;
}

function insertNewlines(str, n) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
      result += str[i];
      // 如果當前索引是 N 的倍數且不是字串的最後一個字符，則加入換行符號
      if ((i + 1) % n === 0 && i !== str.length - 1) {
          result += '\n';
      }
  }
  return result;
}

function splitDateTime(dateTimeString) {
  // 將日期和時間字串以 'T' 符號分割成日期部分和時間部分
  const [datePart, timePart] = dateTimeString.split('T');

  // 將日期部分以 '-' 符號分割成年、月、日
  const [year, month, day] = datePart.split('-');

  // 將時間部分以 ':' 符號分割成時、分
  const [hour, minute] = timePart.split(':');

  // 返回包含拆分後的年、月、日、時、分的物件
  return {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      hour: parseInt(hour),
      minute: parseInt(minute)
  };
}

function returnValue(value) {
  if (value) {
      return 'V';
  } else {
      return ' ';
  }
}

async function createPDFDocument(formData,savePath) {
// 建立或尋找目標資料夾
const outputPath = path.join(savePath, 'PDFout');
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}
  const doc = new PDFDocument();
  const dateAndTime = splitDateTime(formData.information.constructionDate)

  // 檔名
  const outputFileName = `${dateAndTime.year}${dateAndTime.month}${dateAndTime.day}${formData.information.name}.pdf`;
  
  // 輸出路徑
  // 指定 PDF 檔案的輸出路徑為 PDFout 資料夾下的 output.pdf
  const outputFile = path.join(outputPath, outputFileName);
  // 執行輸出
  // 執行寫入檔案
  const writeStream = fs.createWriteStream(outputFile);
  doc.pipe(writeStream);
  const fontPath = path.join(__dirname,'/fonts/TW-Kai-98_1.ttf')
  console.log(fontPath);
  doc.font(fontPath)

  const margins = {
    top: cmToPoints(1),
    bottom: cmToPoints(0),
    left: cmToPoints(1.6),
    right: cmToPoints(1.2),
  };

  doc.page.margins = margins;

  
  // 客戶名稱

  doc.fontSize(11).text(formData.information.name, cmToPoints(2.8), cmToPoints(1.1));

  // 發票抬頭
  doc.fontSize(11).text(formData.information.billName, cmToPoints(2.8), cmToPoints(1.8));

  // 統一編號
  doc.fontSize(11).text(formData.information.billNumber, cmToPoints(2.8), cmToPoints(2.5));

  // 電話
  doc.fontSize(11).text(formData.information.contactPhone, cmToPoints(2.8), cmToPoints(3.2));

  // 聯絡人
  doc.fontSize(11).text(formData.information.contact, cmToPoints(2.8), cmToPoints(3.8));

  // 施作日客戶窗口
  doc.fontSize(11).text(formData.information.onSiteContact, cmToPoints(12), cmToPoints(1.3));

  // 當日聯絡電話
  doc.fontSize(11).text(formData.information.onSiteContactPhone, cmToPoints(17.2), cmToPoints(1.3));

  // 施工日期/時間


  // 年
  doc.fontSize(11).text(dateAndTime.year, cmToPoints(13), cmToPoints(2.5));
  // 月
  doc.fontSize(11).text(dateAndTime.month, cmToPoints(14.6), cmToPoints(2.5));
  // 日
  doc.fontSize(11).text(dateAndTime.day, cmToPoints(15.6), cmToPoints(2.5));
  // 時
  doc.fontSize(11).text(dateAndTime.hour, cmToPoints(16.5), cmToPoints(2.5));

  // 分
  doc.fontSize(11).text(dateAndTime.minute, cmToPoints(17.6), cmToPoints(2.5));

  // 地點
  doc
    .fontSize(11)
    .text(insertNewlines(formData.information.constructionAddress,25), cmToPoints(12), cmToPoints(3.5));

  // 施工頻率 TODO 
  if (formData.selectOption.Option === "oneTime") {  
    // 一次施工 
    doc.fontSize(12).text('V', cmToPoints(3.1), cmToPoints(4.5));
  }else{
    // 定期保養
    doc.fontSize(12).text('V', cmToPoints(6.6), cmToPoints(4.5));
    // 每月
    doc.fontSize(11).text(formData.selectOption.reusableMonth, cmToPoints(11.4), cmToPoints(4.5));

    // 每季
    doc.fontSize(11).text(formData.selectOption.reusableSeason, cmToPoints(14.9), cmToPoints(4.5));

    // 每半年
    doc.fontSize(11).text(formData.selectOption.reusableHalfYear, cmToPoints(19), cmToPoints(4.5));
  }

  


  // 防治項目
  // 一般病蟲
  doc.fontSize(12).text(returnValue(formData.controlCheckbox.pestControlCheckbox), cmToPoints(2.8), cmToPoints(5.7));

  // 跳蚤
  doc.fontSize(12).text(returnValue(formData.controlCheckbox.fleasControlCheckbox), cmToPoints(2.8), cmToPoints(6.7));

  //白蟻
  doc.fontSize(12).text(returnValue(formData.controlCheckbox.termiteControlCheckbox), cmToPoints(8.8), cmToPoints(5.7));
  //粉狀蛀蟲
  doc.fontSize(12).text(returnValue(formData.controlCheckbox.powderPostBeetleCheckbox), cmToPoints(8.8), cmToPoints(6.7));

  //鼠害
  doc.fontSize(12).text(returnValue(formData.controlCheckbox.rodentControlCheckbox), cmToPoints(15.5), cmToPoints(5.7));
  //其他
  doc.fontSize(12).text(returnValue(formData.controlCheckbox.othersCheckbox), cmToPoints(15.5), cmToPoints(6.7));

  doc.fontSize(11).text(formData.drugRecords.content1_1, cmToPoints(0.8), cmToPoints(8.7));
  doc.fontSize(11).text(formData.drugRecords.content1_2, cmToPoints(7.4), cmToPoints(8.7));
  doc.fontSize(11).text(formData.drugRecords.content1_3, cmToPoints(9.6), cmToPoints(8.7));
  doc.fontSize(11).text(formData.drugRecords.content1_4, cmToPoints(11.6), cmToPoints(8.7));
  doc.fontSize(11).text(formData.drugRecords.content1_5, cmToPoints(15.4), cmToPoints(8.7));

  doc.fontSize(11).text(formData.drugRecords.content2_1, cmToPoints(0.8), cmToPoints(9.5));
  doc.fontSize(11).text(formData.drugRecords.content2_2, cmToPoints(7.4), cmToPoints(9.5));
  doc.fontSize(11).text(formData.drugRecords.content2_3, cmToPoints(9.6), cmToPoints(9.5));
  doc.fontSize(11).text(formData.drugRecords.content2_4, cmToPoints(11.6), cmToPoints(9.5));
  doc.fontSize(11).text(formData.drugRecords.content2_5, cmToPoints(15.4), cmToPoints(9.5));

  doc.fontSize(11).text(formData.drugRecords.content3_1, cmToPoints(0.8), cmToPoints(10.3));
  doc.fontSize(11).text(formData.drugRecords.content3_2, cmToPoints(7.4), cmToPoints(10.3));
  doc.fontSize(11).text(formData.drugRecords.content3_3, cmToPoints(9.6), cmToPoints(10.3));
  doc.fontSize(11).text(formData.drugRecords.content3_4, cmToPoints(11.6), cmToPoints(10.3));
  doc.fontSize(11).text(formData.drugRecords.content3_5, cmToPoints(15.4), cmToPoints(10.3));

  doc.fontSize(11).text(formData.drugRecords.content4_1, cmToPoints(0.8), cmToPoints(11.1));
  doc.fontSize(11).text(formData.drugRecords.content4_2, cmToPoints(7.4), cmToPoints(11.1));
  doc.fontSize(11).text(formData.drugRecords.content4_3, cmToPoints(9.6), cmToPoints(11.1));
  doc.fontSize(11).text(formData.drugRecords.content4_4, cmToPoints(11.6), cmToPoints(11.1));
  doc.fontSize(11).text(formData.drugRecords.content4_5, cmToPoints(15.4), cmToPoints(11.1));

  // 一般蟲害防治處理
  //手提式噴灑器
  doc.fontSize(12).text(returnValue(formData.checkedValues.portableSprayerCheckbox), cmToPoints(1.6), cmToPoints(12.2));
  //電動式噴灑器
  doc.fontSize(12).text(returnValue(formData.checkedValues.portableSprayerCheckbox), cmToPoints(1.6), cmToPoints(13.3));
  //中型電動式噴灑器
  doc.fontSize(12).text(returnValue(formData.checkedValues.mediumElectricSprayerCheckbox), cmToPoints(1.6), cmToPoints(14.2));
  //大型汽動式噴灑器
  doc.fontSize(12).text(returnValue(formData.checkedValues.largePneumaticSprayerCheckbox), cmToPoints(1.6), cmToPoints(15.4));
  //動力式噴灑器
  doc.fontSize(12).text(returnValue(formData.checkedValues.powerSprayerCheckbox), cmToPoints(1.6), cmToPoints(16.2));

  // 微粒子空間冷霧
  doc.fontSize(12).text(returnValue(formData.checkedValues.ultrafineSpaceMistMachineCheckbox), cmToPoints(6.4), cmToPoints(12.2));
  //熱霧機
  doc.fontSize(12).text(returnValue(formData.checkedValues.thermalFoggerCheckbox), cmToPoints(6.4), cmToPoints(13.3));
  //蟑螂膠餌
  doc.fontSize(12).text(returnValue(formData.checkedValues.cockroachBaitGelCheckbox), cmToPoints(6.4), cmToPoints(14.2));
  //縫隙處理機
  doc.fontSize(12).text(returnValue(formData.checkedValues.creviceTreatmentMachineCheckbox), cmToPoints(6.4), cmToPoints(15.4));
  //更換捕蟲紙
  doc.fontSize(12).text(returnValue(formData.checkedValues.captureInsectsCheckbox), cmToPoints(6.4), cmToPoints(16.2));
  //捕蟲紙張數
  if (returnValue(formData.checkedValues.captureInsectsCheckbox)) {
    doc.fontSize(12).text(formData.checkedValues.insectsQuantity, cmToPoints(9), cmToPoints(16.1));
  }
  

  // 鼠害防治處理
  //檢視入侵點
  doc.fontSize(12).text(returnValue(formData.checkedValues.viewRodentEntryPointsCheckbox), cmToPoints(11.7), cmToPoints(12.2));
  //檢視鼠跡狀況
  doc.fontSize(12).text(returnValue(formData.checkedValues.viewRodentTracesCheckbox), cmToPoints(11.7), cmToPoints(13.4));
  //補充或更換餌劑
  doc.fontSize(12).text(returnValue(formData.checkedValues.refillOrReplaceBaitCheckbox), cmToPoints(11.7), cmToPoints(14.2));
  //鼠板異動
  doc.fontSize(12).text(returnValue(formData.checkedValues.refillReplaceOrAddTrapsCheckbox), cmToPoints(11.7), cmToPoints(15.4));
  //鼠洞封鎖
  doc.fontSize(12).text(returnValue(formData.checkedValues.rodentProofingCheckbox), cmToPoints(11.7), cmToPoints(16.4));

  // 設計老鼠活動路徑
  doc.fontSize(12).text(returnValue(formData.checkedValues.designRodentMovementPathsCheckbox), cmToPoints(16.2), cmToPoints(12.2));
  // 忌避劑
  doc.fontSize(12).text(returnValue(formData.checkedValues.applyRepellentCheckbox), cmToPoints(16.2), cmToPoints(13.3));
  // 捕獲老鼠選項
  doc.fontSize(12).text(returnValue(formData.checkedValues.captureRodentsCheckbox), cmToPoints(16.2), cmToPoints(14.2));
  // 捕獲老鼠數量
  if (returnValue(formData.checkedValues.captureRodentsCheckbox)) {
    doc.fontSize(12).text(formData.checkedValues.rodentsQuantity, cmToPoints(18.8), cmToPoints(14.1));
  }
  
  //除臭除菌
  doc.fontSize(11).text(returnValue(formData.checkedValues.deodorizeAndDisinfectCheckbox), cmToPoints(16.2), cmToPoints(15.4));
  // 震動或超音波
  doc.fontSize(11).text(returnValue(formData.checkedValues.installVibrationOrUltrasonicDeviceCheckbox), cmToPoints(16.2), cmToPoints(16.2));

  // 交辦事項
  doc.fontSize(11).text(formData.todolist, cmToPoints(3.5), cmToPoints(17.4));

  // 工作報告
  doc.fontSize(11).text(insertNewlines(formData.worksReport,34), cmToPoints(1.4), cmToPoints(18.3));

  doc.fontSize(11).text(formData.techniciant, cmToPoints(3.7), cmToPoints(23.5));
  doc.fontSize(11).text(formData.pesticideApplicatort, cmToPoints(3.7), cmToPoints(24.5));

  doc.end();
}



module.exports = {
  createPDFDocument,
}
