/**
 * All trigger functions by some event (eg. from submit).
 * Author: Patsagorn Yuenyong (PCSHSBR 28) <ptsgrn.dev>
 * License: MIT
 * Always sync this file with the source at <https://github.com/PCSHSBR/music-queue>!
 * Date: 3 Nov 2023
 */

/**
 * Setting up the app script for permission on FormApp and SpreadsheetApp.
 */
function setup() {
  // for form permission
  FormApp.getActiveForm();
  SpreadsheetApp.getActiveSpreadsheet();
}

let sheetLocker = LockService.getScriptLock();

/**
 * On form submit, run this workflow:
 * - Get current time and date
 * - Open data sheet
 * - Get data submitted, make it into an array
 * - push that array to last row in data sheet
 *  - make sure that the lock is in released state, else wait
 * - done
 */
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
