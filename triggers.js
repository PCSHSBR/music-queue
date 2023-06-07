function setup() {
  // for form permission
  FormApp.getActiveForm();
  SpreadsheetApp.getActiveSpreadsheet();
}

let sheetLocker = LockService.getScriptLock();

// on form submit, save response to data sheet
function onFormSubmit(e) {
  let sheet = SpreadsheetApp.openByUrl(DATA_SHEET_URL);
  let sheetDataSheet = sheet.getSheetByName(SHEET_NAME);

  // `exponentialBackoff_` is needed as the response data might not be available
  // immediately after onFormSubmit is invoked. Result in item responses are null.
  let data;
  try {
    data = exponentialBackoff_(() => e.response.getItemResponses());
  } catch (error) {
    Logger.log(error.message);
    data = "";
  }

  // Init row array
  let row = [];
  // Use `exponentialBackoff_` same reason as above.
  let date;
  try {
    date = exponentialBackoff_(() => e.response.getTimestamp());
  } catch (error) {
    Logger.log(error.message);
    date = "";
  }
  // Give a precise time of request.
  // 2001-07-04T12:08:56.235-0700
  row.push(Utilities.formatDate(date, "GMT+7", "yyyy-MM-dd'T'HH:mm:ss.SSSZ"));

  // Loop all response field, save it to an array.
  for (let i = 0; i < data.length; i++) {
    row.push(data[i].getResponse());
  }

  // For inspecting reason.
  Logger.log(row);

  // Next part is soldly for preventing google sheet overwriting data in the same row
  // when there's a lot of request in form.
  // It will try to wait as per exponentialBackoff_ work when the lock still active,
  // then continue again.
  exponentialBackoff_(function waitLock() {
    // locking for 5s
    // no reason for this magic number, just come up in my mind
    sheetLocker.waitLock(5000);
  }, 5);

  // Now actually append new data to the data sheet.
  sheetDataSheet.appendRow(row);

  // release lock
  sheetLocker.releaseLock();
}
