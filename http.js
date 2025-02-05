/**
 * Web app's HTTP request handler.
 * Author: Patsagorn Yuenyong (PCSHSBR 28) <ptsgrn.dev>
 * License: MIT
 * Always sync this file with the source at <https://github.com/PCSHSBR/music-queue>!
 * Date: 3 Nov 2023
 */

function doGet(e) {
  let template = HtmlService.createTemplateFromFile("templates/index");
  template.data = getData();
  return template
    .evaluate()
    .setTitle("คิวเพลง - PCSHSBR Radio")
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setFaviconUrl("https://pcshsbr-assets.imgix.net/logo_outline-min.png")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  let todayData = getData();
  return ContentService.createTextOutput(JSON.stringify(todayData)).setMimeType(
    ContentService.MimeType.JSON
  );
}
