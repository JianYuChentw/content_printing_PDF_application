document.addEventListener('DOMContentLoaded', () => {
  // 當 DOM 內容加載完成後執行
  const dropdown = document.getElementById('namesDropdown');

  ipcRenderer.on('names-loaded', (event, names) => {
      // 當接收到 'names-loaded' 事件時，將名稱加載到下拉選單中
      names.forEach(name => {
          const option = document.createElement('option');
          option.value = name;
          option.text = name;
          dropdown.appendChild(option);
      });
  });

  ipcRenderer.on('details-by-name-result', (event, details) => {
      // 根據返回的數據結構填充表格
      Object.keys(details).forEach((key, index) => {
          if (key.startsWith('content')) { // 確保只處理內容相關的屬性
              Object.entries(details[key]).forEach(([field, value]) => {
                  const input = document.querySelector(`input[name='${field}']`);
                  if (input) {
                      input.value = value;
                  }
              });
          }
      });
  });

  const saveButton = document.getElementById('saveButton');

  saveButton.addEventListener('click', () => { 
      // 保存按鈕點擊事件處理器
      const selectedName = document.getElementById('namesDropdown').value;
      if (selectedName == '-') {
          alert('無法更新預設項目！');
          event.preventDefault();
          return;
      }
      // 收集表單數據
      const details = {
          content1: {
              content1_1: document.querySelector(`input[name='content1_1']`).value,
              content1_2: document.querySelector(`input[name='content1_2']`).value,
              content1_3: document.querySelector(`input[name='content1_3']`).value,
              content1_4: document.querySelector(`input[name='content1_4']`).value,
              content1_5: document.querySelector(`input[name='content1_5']`).value
          },
          content2: {
              content2_1: document.querySelector(`input[name='content2_1']`).value,
              content2_2: document.querySelector(`input[name='content2_2']`).value,
              content2_3: document.querySelector(`input[name='content2_3']`).value,
              content2_4: document.querySelector(`input[name='content2_4']`).value,
              content2_5: document.querySelector(`input[name='content2_5']`).value
          },
          content3: {
              content3_1: document.querySelector(`input[name='content3_1']`).value,
              content3_2: document.querySelector(`input[name='content3_2']`).value,
              content3_3: document.querySelector(`input[name='content3_3']`).value,
              content3_4: document.querySelector(`input[name='content3_4']`).value,
              content3_5: document.querySelector(`input[name='content3_5']`).value
          },
          content4: {
              content4_1: document.querySelector(`input[name='content4_1']`).value,
              content4_2: document.querySelector(`input[name='content4_2']`).value,
              content4_3: document.querySelector(`input[name='content4_3']`).value,
              content4_4: document.querySelector(`input[name='content4_4']`).value,
              content4_5: document.querySelector(`input[name='content4_5']`).value
          },
      };
      // 發送 'save-details' 事件到後端
      ipcRenderer.send('save-details', { name: selectedName, details });

      alert('保存成功！');
      event.preventDefault();
  });

  dropdown.addEventListener('change', () => {
      // 當選擇下拉選單中的一個選項時，發送 'get-details-by-name' 事件到後端
      const selectedName = dropdown.value;
      ipcRenderer.send('get-details-by-name', selectedName);
  });

  const removeButton = document.getElementById('removeButton');
  removeButton.addEventListener('click', () => { 
      // 刪除按鈕點擊事件處理器
      const selectedName = document.getElementById('namesDropdown').value;

      if(selectedName == '-') {
          alert('無法刪除預設項目！');
          event.preventDefault();
          return;
      }
      // 發送 'remove-details' 事件到後端
      ipcRenderer.send('remove-details', { name: selectedName });

      alert('刪除成功！');
      event.preventDefault();
      window.location.reload();
  });

  const createButton = document.getElementById('addButton');
  createButton.addEventListener('click', () => { 
      // 新增按鈕點擊事件處理器
      const selectedName = document.getElementById('newCombination').value;
      if (!selectedName || selectedName == '-') {
          alert('新增項目名稱不得為空');
          return; 
      }
      // 收集表單數據
      const details = {
          dataName: selectedName,
          content1: {
              content1_1: document.querySelector(`input[name='content1_1']`).value,
              content1_2: document.querySelector(`input[name='content1_2']`).value,
              content1_3: document.querySelector(`input[name='content1_3']`).value,
              content1_4: document.querySelector(`input[name='content1_4']`).value,
              content1_5: document.querySelector(`input[name='content1_5']`).value
          },
          content2: {
              content2_1: document.querySelector(`input[name='content2_1']`).value,
              content2_2: document.querySelector(`input[name='content2_2']`).value,
              content2_3: document.querySelector(`input[name='content2_3']`).value,
              content2_4: document.querySelector(`input[name='content2_4']`).value,
              content2_5: document.querySelector(`input[name='content2_5']`).value
          },
          content3: {
              content3_1: document.querySelector(`input[name='content3_1']`).value,
              content3_2: document.querySelector(`input[name='content3_2']`).value,
              content3_3: document.querySelector(`input[name='content3_3']`).value,
              content3_4: document.querySelector(`input[name='content3_4']`).value,
              content3_5: document.querySelector(`input[name='content3_5']`).value
          },
          content4: {
              content4_1: document.querySelector(`input[name='content4_1']`).value,
              content4_2: document.querySelector(`input[name='content4_2']`).value,
              content4_3: document.querySelector(`input[name='content4_3']`).value,
              content4_4: document.querySelector(`input[name='content4_4']`).value,
              content4_5: document.querySelector(`input[name='content4_5']`).value
          },
      };
      // 發送 'createCombination' 事件到後端
      ipcRenderer.send('createCombination', { details });
      event.preventDefault();
  });

  ipcRenderer.on('createCombination', (event, message) => {
      // 接收 'createCombination' 事件的回覆
      if (message !== '新增成功') {
          // 如果操作失敗，彈出提示框顯示失敗消息
          alert('名稱不得重複！');
          event.preventDefault();
      } else {
          alert('新增成功！');
          event.preventDefault();
      }
  });

  // 初始化時發送 'load-names' 事件，請求加載名稱
  ipcRenderer.send('load-names');
});
