function setup() {
  // for form permission
  FormApp.getActiveForm()
  SpreadsheetApp.getActiveSpreadsheet()
}

// on form submit
function onFormSubmit(e) {
  // append data to sheet
  let sheet = SpreadsheetApp.openByUrl(DATA_SHEET_URL);
  let sheetData = sheet.getSheetByName(SHEET_NAME);
  let data = e.response.getItemResponses();
  let row = [];
  let date = e.response.getTimestamp();
  row.push(Utilities.formatDate(date, "GMT+7", "yyyy-MM-dd HH:mm:ss"));
  for (let i = 0; i < data.length; i++) {
    row.push(data[i].getResponse());
  }
  sheetData.appendRow(row);
}