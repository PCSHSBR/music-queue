/**
 * ลบการตอบกลับฟอร์มทั้งหมด
 * @returns {void}
 */
function deleteOldSongsInForm() {
  Logger.log("Deleting old songs in form");
  let activeForm = FormApp.getActiveForm();
  activeForm.deleteAllResponses();
  resetFormTargetSheet()
}

function resetFormTargetSheet() {
  Logger.log("Resetting form target sheet");
  // get current sheet target by active google form
  let activeForm = FormApp.getActiveForm();
  let formTargetSheetID = activeForm.getDestinationId();
  if (formTargetSheetID) {
    let sheet = SpreadsheetApp.openById(formTargetSheetID);
    // form target sheet usually the first sheet
    let sheetData = sheet.getSheets()[0];
    // clear all data in sheet except header in first row
    sheetData.getRangeList(["A2:D"]).clearContent().clearFormat().clearNote();
  } else {
    // target spreadsheet not found
    Logger.log("Target spreadsheet not found");
    // create new and set as form target
    let newSheet = SpreadsheetApp.create(`Song request (from ${Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd")})`);
    activeForm.setDestination(FormApp.DestinationType.SPREADSHEET, newSheet.getId());
  }
}