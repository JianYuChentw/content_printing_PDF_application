document.addEventListener('DOMContentLoaded', () => {
    const cliDropdown = document.getElementById('clienNamesDropdown');
  
    ipcRenderer.on('customerNames-loaded', (event, names) => {
        names.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.text = name;
            cliDropdown.appendChild(option);
        });
    });

    ipcRenderer.on('details-cli-by-name-result', (event, details) => {
  
        Object.entries(details).forEach(([field, value]) => {
            const input = document.getElementById(field);
            if (input) {
                input.value = value;
            }
        });
    });
    
    const saveCliButton = document.getElementById('saveClientButton');
  
    saveCliButton.addEventListener('click', () => { 
        
      const selectedName = document.getElementById('clienNamesDropdown').value;
      if (selectedName=='-') {
        alert('無法更新預設項目！');
        event.preventDefault();
        return
      }
      const details = {
        nameInput: document.querySelector(`input[name='nameInput']`).value,
        billNameInput: document.querySelector(`input[name='billNameInput']`).value,
        billNumberInput: document.querySelector(`input[name='billNumberInput']`).value,
        contactPhoneInput: document.querySelector(`input[name='contactPhoneInput']`).value,
        contactInput: document.querySelector(`input[name='contactInput']`).value,
        onSiteContactInput: document.querySelector(`input[name='onSiteContactInput']`).value,
        onSiteContactPhoneInput: document.querySelector(`input[name='onSiteContactPhoneInput']`).value,
        constructionAddressInput: document.querySelector(`textarea[name='constructionAddressInput']`).value,
      }
      console.log( selectedName, details );
      ipcRenderer.send('save-cli-details', { name: selectedName, details:details });

        alert('保存成功！');
        event.preventDefault();
  });
    
  
  cliDropdown.addEventListener('change', () => {
        const selectedName = cliDropdown.value;
        ipcRenderer.send('get-cli-details-by-name', selectedName);
    });


    const removeButton = document.getElementById('removeClienButton');
    removeButton.addEventListener('click', () => { 
        const selectedName = document.getElementById('clienNamesDropdown').value;
        
        if(selectedName=='-') {
            alert('無法刪除預設項目！');
          event.preventDefault();
          return
        }
        ipcRenderer.send('remove-cli-details', { name: selectedName });
  
        alert('刪除成功！');
        event.preventDefault();
        window.location.reload();
        

    });

    const createButton = document.getElementById('addClienButton');
      


      createButton.addEventListener('click', (event) => {
        event.preventDefault(); // 防止表單默認提交行為
    
        const selectedName = document.getElementById('newClien').value;
        if (!selectedName || selectedName == '-') {
            alert('新增項目名稱不得為空');
            return;
        }
        
        const details = {
            dataName: selectedName,
            nameInput: document.querySelector(`input[name='nameInput']`).value,
            billNameInput: document.querySelector(`input[name='billNameInput']`).value,
            billNumberInput: document.querySelector(`input[name='billNumberInput']`).value,
            contactPhoneInput: document.querySelector(`input[name='contactPhoneInput']`).value,
            contactInput: document.querySelector(`input[name='contactInput']`).value,
            onSiteContactInput: document.querySelector(`input[name='onSiteContactInput']`).value,
            onSiteContactPhoneInput: document.querySelector(`input[name='onSiteContactPhoneInput']`).value,
            constructionAddressInput: document.querySelector(`textarea[name='constructionAddressInput']`).value,
        };
        ipcRenderer.send('createCli', { details }); // 發送資料給後端
    });
    
    ipcRenderer.on('createCli', (event, message) => {
        if (message !== '新增成功') {
            // 如果操作失敗，彈出提示框顯示失敗消息
            alert(message); // 顯示後端傳回的錯誤消息
        } else {
            alert('新增成功！');
            window.location.reload(); // 新增成功後刷新頁面
        }
    });
    
  
    ipcRenderer.send('loadCustomerNames');
  });