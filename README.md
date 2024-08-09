# **Content Printing PDF App**

> 一款將內容轉印至預設三聯單規格文件的生產應用程式

## **功能說明**

### **客戶記錄功能**
- 可將客戶的基本資訊與相關數據記錄，方便後續查詢和管理。

### **藥品搭配紀錄功能**
- 記錄不同場域使用的藥物搭配資訊，為醫療與製藥領域提供數據支持。

### **轉印輸出 PDF 檔案**
- 將已記錄的內容轉印並輸出為 PDF 格式，支援自定義三聯單規格。

## **安裝與運行**

### **前置需求**
- 需先安裝 [Node.js](https://nodejs.org/) 與 [npm](https://www.npmjs.com/)

### **安裝**
1. Clone 此專案至本地端
    ```bash
    git clone https://github.com/你的帳號/printing_pdf_app.git
    ```
2. 進入專案目錄
    ```bash
    cd printing_pdf_app
    ```
3. 安裝所需的套件
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
