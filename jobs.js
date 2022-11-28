/**
 * ลบการตอบกลับฟอร์มทั้งหมด
 * @returns {void}
 */
function deleteOldSongsInForm() {
  Logger.log("Deleting old songs in form");
  let activeForm = FormApp.getActiveForm();
  activeForm.deleteAllResponses();
}