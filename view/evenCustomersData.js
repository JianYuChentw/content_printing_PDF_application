
const utils = require('../utils')
const dataFileName = 'historyCustomer.json'; // 檔案名稱
// const dataFilePath = path.resolve(__dirname, '..', 'save', dataFileName);
console.log(utils.saveDataFilePath(dataFileName));

document.addEventListener('DOMContentLoaded', () => {
    const historicalCustomersDropdown = document.getElementById('historicalCustomers');
    const saveCustomersButton = document.getElementById('saveCustomersButton');
    const removeCustomersButton = document.getElementById('removeCustomersButton');
    const addCustomersButton = document.getElementById('addCustomersButton');

    ipcRenderer.on('customerNames-loaded', (event, names) => {
        // 清空下拉選單
        historicalCustomersDropdown.innerHTML = '';
        // 加載歷史客戶到下拉選單
        names.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.text = name;
            historicalCustomersDropdown.appendChild(option);
        });
    });

    ipcRenderer.on('details-cli-by-name-result', (event, details) => {
        // 根據返回的數據結構填充表格
        if (details) {
            document.getElementById('nameInput').value = details.nameInput || '';
            document.getElementById('billNameInput').value = details.billNameInput || '';
            document.getElementById('billNumberInput').value = details.billNumberInput || '';
            document.getElementById('contactPhoneInput').value = details.contactPhoneInput || '';
            document.getElementById('contactInput').value = details.contactInput || '';
            document.getElementById('onSiteContactInput').value = details.onSiteContactInput || '';
            document.getElementById('onSiteContactPhoneInput').value = details.onSiteContactPhoneInput || '';
            document.getElementById('constructionAddressInput').value = details.constructionAddressInput || '';
        }
    });

    saveCustomersButton.addEventListener('click', (event) => {
        // 保存按鈕點擊事件處理器
        const selectedName = historicalCustomersDropdown.value;
        if (selectedName == '-') {
            alert('無法更新預設項目！');
            event.preventDefault();
            return;
        }
        const details = {
            dataName: selectedName,
            nameInput: document.getElementById('nameInput').value,
            billNameInput: document.getElementById('billNameInput').value,
            billNumberInput: document.getElementById('billNumberInput').value,
            contactPhoneInput: document.getElementById('contactPhoneInput').value,
            contactInput: document.getElementById('contactInput').value,
            onSiteContactInput: document.getElementById('onSiteContactInput').value,
            onSiteContactPhoneInput: document.getElementById('onSiteContactPhoneInput').value,
            constructionAddressInput: document.getElementById('constructionAddressInput').value
        };
        // 發送 'save-cli-details' 事件到後端
        ipcRenderer.send('save-cli-details', { name: selectedName, details });

        alert('保存成功！');
        event.preventDefault();
    });

    removeCustomersButton.addEventListener('click', (event) => {
        // 刪除按鈕點擊事件處理器
        const selectedName = historicalCustomersDropdown.value;

        if (selectedName == '-') {
            alert('無法刪除預設項目！');
            event.preventDefault();
            return;
        }
        // 發送 'remove-cli-details' 事件到後端
        ipcRenderer.send('remove-cli-details', { name: selectedName });

        alert('刪除成功！');
        event.preventDefault();
        window.location.reload();
    });

    addCustomersButton.addEventListener('click', (event) => {
        // 新增按鈕點擊事件處理器
        const newCustomerName = document.getElementById('newCustomers').value;
        if (!newCustomerName || newCustomerName == '-') {
            alert('新增客戶名稱不得為空');
            return;
        }
        const details = {
            dataName: newCustomerName, // 確保使用 dataName 作為新客戶的名稱
            nameInput: document.getElementById('nameInput').value,
            billNameInput: document.getElementById('billNameInput').value,
            billNumberInput: document.getElementById('billNumberInput').value,
            contactPhoneInput: document.getElementById('contactPhoneInput').value,
            contactInput: document.getElementById('contactInput').value,
            onSiteContactInput: document.getElementById('onSiteContactInput').value,
            onSiteContactPhoneInput: document.getElementById('onSiteContactPhoneInput').value,
            constructionAddressInput: document.getElementById('constructionAddressInput').value,
            userStatus: true
        };
        // 發送 'createCli' 事件到後端
        ipcRenderer.send('createCli', { details });
        event.preventDefault();
    });

    ipcRenderer.on('createCli', (event, message) => {
        // 接收 'createCli' 事件的回覆
        if (message !== '新增成功') {
            // 如果操作失敗，彈出提示框顯示失敗消息
            alert('名稱不得重複！');
            event.preventDefault();
        } else {
            alert('新增成功！');
            // 新增成功後重新加載客戶名稱到下拉選單
            ipcRenderer.send('loadCustomerNames');
            event.preventDefault();
        }
    });

    // 當下拉選單選擇改變時，請求相應的客戶詳細信息
    historicalCustomersDropdown.addEventListener('change', () => {
        const selectedName = historicalCustomersDropdown.value;
        ipcRenderer.send('get-cli-details-by-name', selectedName);
    });

    // 初始化時發送 'loadCustomerNames' 事件，請求加載客戶名稱
    ipcRenderer.send('loadCustomerNames');
});
