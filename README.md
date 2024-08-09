# **Content Printing PDF App**

> 一款將內容轉印至預設三聯單規格文件的生產應用程式

## **功能說明**

### **客戶記錄功能**
- 可將客戶的基本資訊與相關數據記錄，方便後續查詢和管理。

### **藥品搭配紀錄功能**
- 記錄不同場域使用的藥物搭配資訊，為醫療與製藥領域提供數據支持。

### **轉印輸出 PDF 檔案**
- 將已記錄的內容轉印並輸出為 PDF 格式，支援自定義三聯單規格。

## **專案技術**

### **前端**
- **HTML/CSS/JavaScript**: 使用標準的網頁技術構建用戶界面。
- **Electron**: 提供跨平台桌面應用程式的框架。

### **後端**
- **Node.js**: 作為伺服器環境，用於執行 JavaScript 後端邏輯。
- **PDFKit**: 用於生成 PDF 文件，支持高度自定義。

### **工具與建構**
- **Electron Builder**: 用於應用程式的打包與發佈。
- **NPM**: 管理專案中的相依性和腳本。

## **安裝與運行**

### **前置需求**
- 需先安裝 [Node.js](https://nodejs.org/) 與 [npm](https://www.npmjs.com/)

### **安裝**
1. 進入專案目錄
    ```bash
    cd printing_pdf_app
    ```
2. 安裝所需的套件
    ```bash
    npm install
    ```

### **運行**
- 開發模式啟動
    ```bash
    npm start
    ```
- 編譯與打包應用程式
    ```bash
    npm run build
    ```

### **針對 Windows 64-bit 系統編譯**
```bash
npm run build:win64
