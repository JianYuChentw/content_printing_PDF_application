document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('namesDropdown');
  
    ipcRenderer.on('names-loaded', (event, names) => {
        names.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.text = name;
            dropdown.appendChild(option);
        });
    });
  
    ipcRenderer.on('details-by-name-result', (event, details) => {
        // 根据返回的数据结构填充表格
        Object.keys(details).forEach((key, index) => {
            if (key.startsWith('content')) { // 确保只处理内容相关的属性
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
      const selectedName = document.getElementById('namesDropdown').value;
      if (selectedName=='-') {
        alert('無法更新預設項目！');
        event.preventDefault();
        return
      }
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
      ipcRenderer.send('save-details', { name: selectedName, details });

        alert('保存成功！');
        event.preventDefault();
  });
  
    dropdown.addEventListener('change', () => {
        const selectedName = dropdown.value;
        ipcRenderer.send('get-details-by-name', selectedName);
    });

    const removeButton = document.getElementById('removeButton');
    removeButton.addEventListener('click', () => { 
        const selectedName = document.getElementById('namesDropdown').value;
        
        if(selectedName=='-') {
            alert('無法刪除預設項目！');
          event.preventDefault();
          return
        }
        ipcRenderer.send('remove-details', { name: selectedName });
  
        alert('刪除成功！');
        event.preventDefault();
        window.location.reload();
        

    });


    const createButton = document.getElementById('addButton');
  
    createButton.addEventListener('click', () => { 
        const selectedName = document.getElementById('newCombination').value;
        if (!selectedName || selectedName=='-') {
          alert('新增項目名稱不得為空');
          return; 
        }
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
        ipcRenderer.send('createCombination', { details });
        event.preventDefault();
      });
      
      ipcRenderer.on('createCombination', (event, message) => {
        if (message !== '新增成功') {
          // 如果操作失败，弹出提示框显示失败消息
          alert('名稱不得重複！');
          event.preventDefault();
        }else{
            alert('新增成功！');
            event.preventDefault();
        }
      });
      
  
    ipcRenderer.send('load-names');
  });