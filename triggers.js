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
  let data = e.response.getItemResponses();
  let row = [];
  let date = e.response.getTimestamp();
  // 2001-07-04T12:08:56.235-0700
  row.push(Utilities.formatDate(date, "GMT+7", "yyyy-MM-dd'T'HH:mm:ss.SSSZ"));
  for (let i = 0; i < data.length; i++) {
    row.push(data[i].getResponse());
  }
  sheetData.appendRow(row);
}