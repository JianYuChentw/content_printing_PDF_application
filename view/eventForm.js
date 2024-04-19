
// 監聽選擇框的變化事件
document.getElementById('selectOption').addEventListener('change', function() {
  // 獲取選擇的值
  var selectedValue = this.value;
  
  // 根據選擇的值啟用或禁用相應的輸入欄
  if (selectedValue === 'reusable') {
    document.getElementById('reusableMonth').disabled = false;
    document.getElementById('reusableSeason').disabled = false;
    document.getElementById('reusableHalfYear').disabled = false;
  } else {
    document.getElementById('reusableMonth').disabled = true;
    document.getElementById('reusableSeason').disabled = true;
    document.getElementById('reusableHalfYear').disabled = true;
  }
});

// 複選匡鎖
const captureRodentsCheckbox = document.getElementById('captureRodentsCheckbox');
const rodentsQuantityInput = document.getElementById('rodentsQuantity');
const captureInsectsCheckbox = document.getElementById('captureInsectsCheckbox');
const insectsQuantityInput = document.getElementById('insectsQuantity');

captureRodentsCheckbox.addEventListener('change', function () {
  rodentsQuantityInput.disabled = !this.checked;
});

captureInsectsCheckbox.addEventListener('change', function () {
  insectsQuantityInput.disabled = !this.checked;
});

