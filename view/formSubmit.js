// 獲取表單元素
const form = document.getElementById('contact');
const { ipcRenderer } = require('electron');

form.addEventListener('keydown', function(event) {
 
  if (event.key === 'Enter') {
    event.preventDefault();
  }
});

// 監聽表單的提交事件
form.addEventListener('submit', function (event) {
  event.preventDefault();
  // 獲取表單輸入的值
  const name = document.getElementById('nameInput').value;
  const billName = document.getElementById('billNameInput').value;
  const billNumber = document.getElementById('billNumberInput').value;
  const contactPhone = document.getElementById('contactPhoneInput').value;
  const contact = document.getElementById('contactInput').value;
  const onSiteContact = document.getElementById('onSiteContactInput').value;
  const onSiteContactPhone = document.getElementById(
    'onSiteContactPhoneInput'
  ).value;
  const constructionDate = document.getElementById(
    'constructionDateInput'
  ).value;
  const constructionAddress = document.getElementById(
    'constructionAddressInput'
  ).value;

  if (name.trim() === '' || constructionDate.trim() === '') {
    alert('請填寫姓名和施工日期！');
    return;
  }

  const selectOption = document.getElementById('selectOption').value;
  if (selectOption === 'reusable') {
    reusableMonth = document.getElementById('reusableMonth').value;
    reusableSeason = document.getElementById('reusableSeason').value;
    reusableHalfYear = document.getElementById('reusableHalfYear').value;
  } else {
    reusableMonth = '';
    reusableSeason = '';
    reusableHalfYear = '';
  }

  const pestControlCheckbox = document.getElementById(
    'pestControlCheckbox'
  ).checked;
  const termiteControlCheckbox = document.getElementById(
    'termiteControlCheckbox'
  ).checked;
  const rodentControlCheckbox = document.getElementById(
    'rodentControlCheckbox'
  ).checked;
  const fleasControlCheckbox = document.getElementById(
    'fleasControlCheckbox'
  ).checked;
  const powderPostBeetleCheckbox = document.getElementById(
    'powderPostBeetleCheckbox'
  ).checked;
  const othersCheckbox = document.getElementById('othersCheckbox').checked;

  // 創建一個空物件來存儲表單內容
  const allTdContent = {};

  // 遍歷所有帶有 'tdContent' class 的 td 元素
  const tdContents = document.querySelectorAll('.tdContent');
  tdContents.forEach((tdContent) => {
    // 將 td 元素的內容存入 allTdContent 物件中
    allTdContent[tdContent.name] = tdContent.value;
  });

  // 獲取所有被選中的核取方塊和其對應的數量
  const checkedValues = {};

  // 一般蟲害防治相關參數
  checkedValues.portableSprayerCheckbox = document.getElementById(
    'portableSprayerCheckbox'
  ).checked;
  checkedValues.electricSprayerCheckbox = document.getElementById(
    'electricSprayerCheckbox'
  ).checked;
  checkedValues.mediumElectricSprayerCheckbox = document.getElementById(
    'mediumElectricSprayerCheckbox'
  ).checked;
  checkedValues.largePneumaticSprayerCheckbox = document.getElementById(
    'largePneumaticSprayerCheckbox'
  ).checked;
  checkedValues.powerSprayerCheckbox = document.getElementById(
    'powerSprayerCheckbox'
  ).checked;
  checkedValues.ultrafineSpaceMistMachineCheckbox = document.getElementById(
    'ultrafineSpaceMistMachineCheckbox'
  ).checked;
  checkedValues.thermalFoggerCheckbox = document.getElementById(
    'thermalFoggerCheckbox'
  ).checked;
  checkedValues.cockroachBaitGelCheckbox = document.getElementById(
    'cockroachBaitGelCheckbox'
  ).checked;
  checkedValues.creviceTreatmentMachineCheckbox = document.getElementById(
    'creviceTreatmentMachineCheckbox'
  ).checked;
  checkedValues.captureInsectsCheckbox = document.getElementById(
    'captureInsectsCheckbox'
  ).checked;
  checkedValues.insectsQuantity =
    document.getElementById('insectsQuantity').value;

  // 鼠疫防治工程相關參數
  checkedValues.viewRodentEntryPointsCheckbox = document.getElementById(
    'viewRodentEntryPointsCheckbox'
  ).checked;
  checkedValues.viewRodentTracesCheckbox = document.getElementById(
    'viewRodentTracesCheckbox'
  ).checked;
  checkedValues.refillOrReplaceBaitCheckbox = document.getElementById(
    'refillOrReplaceBaitCheckbox'
  ).checked;
  checkedValues.refillReplaceOrAddTrapsCheckbox = document.getElementById(
    'refillReplaceOrAddTrapsCheckbox'
  ).checked;
  checkedValues.rodentProofingCheckbox = document.getElementById(
    'rodentProofingCheckbox'
  ).checked;
  checkedValues.designRodentMovementPathsCheckbox = document.getElementById(
    'designRodentMovementPathsCheckbox'
  ).checked;
  checkedValues.applyRepellentCheckbox = document.getElementById(
    'applyRepellentCheckbox'
  ).checked;
  checkedValues.captureRodentsCheckbox = document.getElementById(
    'captureRodentsCheckbox'
  ).checked;
  checkedValues.rodentsQuantity =
    document.getElementById('rodentsQuantity').value;
  checkedValues.deodorizeAndDisinfectCheckbox = document.getElementById(
    'deodorizeAndDisinfectCheckbox'
  ).checked;
  checkedValues.installVibrationOrUltrasonicDeviceCheckbox =
    document.getElementById(
      'installVibrationOrUltrasonicDeviceCheckbox'
    ).checked;

  const todolist = document.getElementById('todolistInput').value;
  const worksReport = document.getElementById('worksReportInput').value;
  const techniciant = document.getElementById('techniciantInput').value;
  const pesticideApplicatort = document.getElementById(
    'pesticideApplicatortInput'
  ).value;

  const formData = {
    information: {
      name: name,
      billName: billName,
      billNumber: billNumber,
      contactPhone: contactPhone,
      contact: contact,
      onSiteContact: onSiteContact,
      onSiteContactPhone: onSiteContactPhone,
      constructionDate: constructionDate,
      constructionAddress: constructionAddress,
    },
    selectOption: {
      Option: selectOption,
      reusableMonth: reusableMonth,
      reusableSeason: reusableSeason,
      reusableHalfYear: reusableHalfYear,
    },
    controlCheckbox: {
      pestControlCheckbox: pestControlCheckbox,
      termiteControlCheckbox: termiteControlCheckbox,
      rodentControlCheckbox: rodentControlCheckbox,
      fleasControlCheckbox: fleasControlCheckbox,
      powderPostBeetleCheckbox: powderPostBeetleCheckbox,
      othersCheckbox: othersCheckbox,
    },
    drugRecords: allTdContent,
    checkedValues: checkedValues,
    todolist: todolist,
    worksReport: worksReport,
    techniciant: techniciant,
    pesticideApplicatort: pesticideApplicatort,
  };

  const confirmed = confirm('確定要送出嗎？');
  if (confirmed) {
    const jsonData = JSON.stringify(formData)
    ipcRenderer.send('frontend-message', jsonData);
    alert('輸出完成！');
    window.location.reload();
  }
});

