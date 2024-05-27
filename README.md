## Gitpage
https://guaguawa1581.github.io/yile-web-frontend-exam/index.html


## 如何執行此專案
```
npm run start
```
## 專案架構與邏輯說明

### 專案結構

``` plaintext
main/
├── public/            # 靜態文件
├── src/
│   ├── components/    # 可重用的 UI 組件
│   │   ├─ Banner
│   │   ├─ Card
│   │   ├─ Modal
│   │   └─ ...
│   ├── styles/        # 背景圖片, 人物圖片
│   ├── images/        # scss樣式文件
│   ├── App.jsx         # 主要頁面
│   └── index.js       # 進入點文件
│
├── package.json      
├── ...  
└── README.md          # 說明文件
```

### 主要邏輯說明

1. **App.jsx**

    因為該傳案只有一個頁面，便將主頁的資料都寫在App.jsx

2. **組件**
    
   \`src/components\` 包含所有可重用的 UI 組件，像橫幅、卡片、篩選的bar

3. **樣式**

   樣式文件位於 \`src/styles\` 中，使用 SCSS 來編寫樣式，App只匯入allStyle.scss，其他scss檔案則統一匯入其中，以便於管理和維護。

## 遇到的困難、問題及解決方法

### 困難與問題

1. **人物眼睛轉動效果**

   要讓眼球移動，又不會看起來怪異
    
    **解決方法**：先使用css animation的方式製作眼球移動的軌跡，再搭配play-state, delay的方      式，進而能使用百分比的形式控制眼球位置。最後用js將螢幕分3部分，雙眼左、右、中，控制眼球移動比例
 
2. **在移動設備和桌面設備之間切換的人物眼睛轉動效果**

   在開發過程中，需要確保能夠在不同的設備上正常顯示。

    **解決方法**：需要監聽現在視窗大小，並使用transform等比縮放整個橫幅的大小

2. **熟悉MUI**

   之前沒什麼使用MUI，需要熟悉一下mui排版跟組件使用
