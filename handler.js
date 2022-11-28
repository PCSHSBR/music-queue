function getDataTable() {
  let template = HtmlService.createTemplateFromFile('templates/table')
  template.data = getData()
  return template
    .evaluate().getContent()
}

/**
 * ดึงค่ารายการเพลงจาก Google Sheet ดึงแคชเมื่อจำเป็น
 */
function getData() {
  let sheet = SpreadsheetApp.openByUrl(DATA_SHEET_URL);
  let sheetData = sheet.getSheetByName(SHEET_NAME);
  // check first column of last row for last update time
  let lastUpdate = sheetData.getRange(sheetData.getLastRow(), 1).getValue();
  let now = new Date();
  let cache = CacheService.getScriptCache();
  let cacheKey = QUEUE_CACHE_KEY;
  let cacheData = cache.get(cacheKey);
  // return cached data if last update was more than MIN_LAST_TIME_BEFORE_USE_CACHE time ago
  if (cacheData && ((now - lastUpdate) > MIN_LAST_TIME_BEFORE_USE_CACHE)) {
    Logger.log("Using cached data");
    return JSON.parse(cacheData);
  }
  let data = sheetData.getDataRange().getValues();
  let today = Utilities.formatDate(new Date(), "GMT+7", `yyyy-MM-dd ${new Date().getHours() >= 12 ? "12" : "00"}:00:00`);
  let todayDate = new Date(today)
  let todayData = [];
  for (let i = 2536; i < data.length; i++) {
    if (data[i][0] > todayDate) {
      todayData.push({
        timestamp: data[i][0],
        name: data[i][1],
        artist: data[i][2],
        note: data[i][3]
      });
    }
  }
  // cache data for CACHE_TIME time
  cache.put(cacheKey, JSON.stringify(todayData), CACHE_TIME);
  return todayData;
}