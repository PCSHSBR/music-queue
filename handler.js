function getDataTable() {
  let template = HtmlService.createTemplateFromFile("templates/table");
  template.data = getData();
  Logger.log(template.evaluate().getContent());
  return template.evaluate().getContent();
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
  if (
    false ||
    (cacheData &&
      now - lastUpdate > MIN_LAST_TIME_BEFORE_USE_CACHE &&
      now - lastUpdate < MAX_LAST_TIME_BEFORE_USE_CACHE)
  ) {
    Logger.log("Using cached data");
    return JSON.parse(cacheData);
  }
  // only get last 75 rows
  let data = sheetData
    .getRange(
      /* row */ sheetData.getLastRow() - 74,
      /* column */ 1,
      /* numRows */ 75,
      /* numColumns */ 4
    )
    .getValues();
  let today = new Date(
    Utilities.formatDate(
      new Date(),
      "GMT+7",
      `yyyy-MM-dd ${new Date().getHours() >= 12 ? "12" : "00"}:00:00+0700`
    )
  );
  let todayData = [];
  for (let i = 0; i < data.length; i++) {
    let row = data[i];
    let rowDate = new Date(row[0]);
    if (rowDate >= today) {
      todayData.push({
        timestamp: Utilities.formatDate(
          rowDate,
          "GMT+7",
          "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
        ),
        name: row[1],
        artist: row[2],
        note: row[3],
      });
    }
  }
  todayData = todayData
    .sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.timestamp) - new Date(a.timestamp);
    })
    .reverse();
  cache.put(cacheKey, JSON.stringify(todayData), CACHE_TIME);
  return todayData;
}
