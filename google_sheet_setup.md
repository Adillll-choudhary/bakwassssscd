# Coldune High-Performance Lead Capture & Automation

This system connects your website forms to a Google Sheet and sends instant Telegram notifications for every lead.

### 1. Google Apps Script Configuration
Copy this code into your Google Apps Script editor (**Extensions > Apps Script**).

```javascript
/**
 * 🤖 COLDUNE AUTOMATION BACKEND
 */
const BOT_TOKEN = "8604811139:AAF6f-G4f42o9aF0v9ZZw5ikqDoegnyRQGc";
const CHAT_ID = "6012538074";
const SHEET_NAME = "Leads";

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["Name", "Email", "Phone", "Service", "Message", "Source", "Timestamp"]);
    }
    
    let params = e.parameter;
    if (Object.keys(params).length === 0 && e.postData && e.postData.contents) {
      try { params = JSON.parse(e.postData.contents); } 
      catch (f) {
        e.postData.contents.split('&').forEach(pair => {
          let parts = pair.split('=');
          params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[parts.length-1] || '');
        });
      }
    }

    const row = [
      params.name || "N/A",
      params.email || "N/A",
      params.phone || "N/A",
      params.service || "N/A",
      params.message || "N/A",
      params.source || "Website Form",
      new Date()
    ];

    sheet.appendRow(row);

    // 2. Prepare Telegram Message
    const cleanText = (str) => String(str).replace(/[_*[\]()~`>#+-=|{}.!]/g, '\\$&');
    
    const telegramText = "🚀 *New Lead Received!*\n\n" +
                         "*Name:* " + cleanText(row[0]) + "\n" +
                         "*Email:* " + cleanText(row[1]) + "\n" +
                         "*Phone:* " + cleanText(row[2]) + "\n" +
                         "*Service:* " + cleanText(row[3]) + "\n" +
                         "*Message:* " + cleanText(row[4]);

    try {
      UrlFetchApp.fetch("https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage", {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify({
          chat_id: CHAT_ID,
          text: telegramText,
          parse_mode: "MarkdownV2"
        }),
        muteHttpExceptions: true
      });
    } catch (e) {
      // Fallback to plain text if Markdown fails
      UrlFetchApp.fetch("https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage", {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify({
          chat_id: CHAT_ID,
          text: "🚀 New Lead Received (Text-only fallback):\n" + row[0] + "\n" + row[2]
        }),
        muteHttpExceptions: true
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 2. Deployment
1. Click **Deploy > New Deployment**.
2. Select **Web App**.
3. Execute as: **Me**.
4. Who has access: **Anyone**.
5. Copy the **Web App URL**.

### 3. Frontend Integration
The following URL is currently active in your website code:
`https://script.google.com/macros/s/AKfycbzdXzUtepW3nBF3F5Gjy7YrnJQe9X1robNBYmRzIH9sHrCu946842BbFLqZ2bohXI1c3A/exec`

---
**Status:** Production Ready
**Version:** 2.0 (Elite Automation)
