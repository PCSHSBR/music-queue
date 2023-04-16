function setup() {
  // for form permission
  FormApp.getActiveForm()
  SpreadsheetApp.getActiveSpreadsheet()
}

// on form submit
function onFormSubmit(e) {
  // Logger.log(JSON.stringify(e))
  // append data to sheet
  let sheet = SpreadsheetApp.openByUrl(DATA_SHEET_URL);
  let sheetData = sheet.getSheetByName(SHEET_NAME);

  let data;
  try {
    data = exponentialBackoff_(() => e.response.getItemResponses());
  } catch (error) {
    Logger.log(error.message);
    data = '';
  }
  let row = [];
  let date;
  try {
    date = exponentialBackoff_(() => e.response.getTimestamp());
  } catch (error) {
    Logger.log(error.message);
    date = '';
  }
  // 2001-07-04T12:08:56.235-0700
  row.push(Utilities.formatDate(date, "GMT+7", "yyyy-MM-dd'T'HH:mm:ss.SSSZ"));
  for (let i = 0; i < data.length; i++) {
    row.push(data[i].getResponse());
  }
  Logger.log(row)
  sheetData.appendRow(row);
}