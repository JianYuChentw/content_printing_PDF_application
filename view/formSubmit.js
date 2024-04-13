// 獲取表單元素
const form = document.getElementById('contact');
  // const { ipcRenderer } = require('electron');


// 監聽表單的提交事件
form.addEventListener('submit', function(event) {
  // 阻止表單預設提交行為
  event.preventDefault();

  // 獲取表單輸入的值
  const name = document.getElementById('nameInput').value;
  const billName = document.getElementById('billNameInput').value;
  const billNumber = document.getElementById('billNumberInput').value;
  const contactPhone = document.getElementById('contactPhoneInput').value;
  const contact = document.getElementById('contactInput').value;
  const onSiteContact = document.getElementById('onSiteContactInput').value;
  const onSiteContactPhone = document.getElementById('onSiteContactPhoneInput').value;
  const constructionDate = document.getElementById('constructionDateInput').value;
  const constructionAddress = document.getElementById('constructionAddressInput').value;
  
  const selectOption = document.getElementById('selectOption').value;
  if (selectOption === "reusable") {
    reusableMonth = document.getElementById('reusableMonth').value;
    reusableSeason = document.getElementById('reusableSeason').value;
    reusableHalfYear = document.getElementById('reusableHalfYear').value;
  } else {
    reusableMonth = "";
    reusableSeason = "";
    reusableHalfYear = "";
  }

  const pestControlCheckbox = document.getElementById('pestControlCheckbox').checked;
  const termiteControlCheckbox = document.getElementById('termiteControlCheckbox').checked;
  const rodentControlCheckbox = document.getElementById('rodentControlCheckbox').checked;
  const fleasControlCheckbox = document.getElementById('fleasControlCheckbox').checked;
  const powderPostBeetleCheckbox = document.getElementById('powderPostBeetleCheckbox').checked;
  const othersCheckbox = document.getElementById('othersCheckbox').checked;

// 創建一個空物件來存儲表單內容
const allTdContent = {};

// 遍歷所有帶有 'tdContent' class 的 td 元素
const tdContents = document.querySelectorAll('.tdContent');
tdContents.forEach(tdContent => {
  // 將 td 元素的內容存入 allTdContent 物件中
  allTdContent[tdContent.name] = tdContent.value;
});

///工具勾選區
// 定義一個函數來獲取勾選的checkbox的值
  function getCheckedValues() {
    // 定義一個空數組來存儲勾選的值
    var checkedValues = [];

    // 獲取第一個區域的checkbox的值
    const container6Checkboxes = document.querySelectorAll('#arear5 .container6 input[type="checkbox"]');
    container6Checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        checkedValues.push(checkbox.name);
      }
    });

    // 獲取第二個區域的checkbox的值
    const container7Checkboxes = document.querySelectorAll('#arear5 .container7 input[type="checkbox"]');
    container7Checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        checkedValues.push(checkbox.name);
      }
    });

    // 返回勾選的值數組
    return checkedValues;
  }

  // 獲取勾選的checkbox的值並顯示在控制台上
  const checkedValues = getCheckedValues();


  const formData = {
    information:{        
      name: name, 
      billName: billName, 
      billNumber: billNumber, 
      contactPhone: contactPhone, 
      contact :contact,
      onSiteContact :onSiteContact,
      onSiteContactPhone :onSiteContactPhone,
      constructionDate :constructionDate,
      constructionAddress:constructionAddress,
    },
    selectOption:{
      Option:selectOption,
      reusableMonth :reusableMonth,
      reusableSeason :reusableSeason, 
      reusableHalfYear: reusableHalfYear,
    },
    controlCheckbox:{
      pestControlCheckbox:pestControlCheckbox,
      termiteControlCheckbox:termiteControlCheckbox,
      rodentControlCheckbox:rodentControlCheckbox,
      fleasControlCheckbox:fleasControlCheckbox,
      powderPostBeetleCheckbox:powderPostBeetleCheckbox,
      othersCheckbox:othersCheckbox
    },
    drugRecords:allTdContent,
    checkedValues:checkedValues
  }

  // ipcRenderer.send('frontend-message', formData); //內容 arg
  console.log(formData);
   // 顯示警示對話框，並檢查用戶是否點擊了 "確定"
  const confirmed = confirm("確定要送出嗎？");
  
  // 如果用戶點擊了 "確定"
  if (confirmed) {
    // 重新加載頁面
    window.location.reload();
  }
});



  // const sendBtn = document.getElementById('sendBtn');
  // sendBtn.addEventListener('click', () => {
  //   ipcRenderer.send('frontend-message', 'Hello from frontend!'); //Hello from frontend!是內容 arg
  // });

  // ipcRenderer.on('backend-reply', (event, arg) => {
  //   console.log(`Received reply from backend: ${arg}`);
  // });