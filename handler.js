/**
 * Handler function used by user client (in index.html).
 * Author: Patsagorn Yuenyong (PCSHSBR 28) <ptsgrn.dev>
 * License: MIT
 * Always sync this file with the source at <https://github.com/PCSHSBR/music-queue>!
 * Date: 3 Nov 2023
 */

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
    (cacheData &&
      now.getTime() - lastUpdate > MIN_LAST_TIME_BEFORE_USE_CACHE &&
      now.getTime() - lastUpdate < MAX_LAST_TIME_BEFORE_USE_CACHE)
  ) {
    Logger.log("Using cached data");
    return JSON.parse(cacheData);
  }

  let currentRowCount = sheetData.getLastRow();
  let data = sheetData
    .getRange(
      /* row */ Math.max(currentRowCount - 74, 0),
      /* column */ 1,
      /* numRows */ currentRowCount,
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

  let todayData = data.filter((row) => {
    let rowDate = new Date(row[0]);
    return rowDate >= today;
  }).map((row) => {
    return {
      timestamp: Utilities.formatDate(
        new Date(row[0]),
        "GMT+7",
        "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
      ),
      name: row[1],
      artist: row[2],
      note: row[3],
    };
  }).sort((a, b) => {
    return (new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) * -1;
  })
  cache.put(cacheKey, JSON.stringify(todayData), CACHE_TIME);
  return todayData;
}
