// ═══════════════════════════════════════════════════════════════════
// Google Apps Script — Wedding Photo Upload Backend
// ═══════════════════════════════════════════════════════════════════
//
// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com and create a new project.
// 2. Paste this entire file into the Code.gs editor.
// 3. Replace the FOLDER_ID below with your Google Drive folder ID.
//    (Open the folder in Drive → copy the ID from the URL:
//     https://drive.google.com/drive/folders/<THIS_IS_YOUR_FOLDER_ID>)
// 4. Deploy → New Deployment → Web App:
//      • Execute as: Me
//      • Who has access: Anyone
// 5. Copy the Web App URL and paste it into wedding-upload.html
//    as the APPS_SCRIPT_URL constant.
// ═══════════════════════════════════════════════════════════════════

/** @const {string} The Google Drive folder ID where photos will be saved. */
var FOLDER_ID = '1vUKNqnx5WmxusxlU1k4d4j0EO2pGvo1G';

/**
 * Handles incoming POST requests from the static site.
 *
 * Expected JSON payload (sent as text/plain to avoid CORS preflight):
 * {
 *   "filename": "IMG_1234.jpg",
 *   "mimeType": "image/jpeg",
 *   "data":     "<base64-encoded image string>"
 * }
 *
 * @param {Object} e - The event object provided by Apps Script.
 * @returns {ContentService.TextOutput} JSON response.
 */
function doPost(e) {
  try {
    // Parse the incoming text body as JSON
    var payload  = JSON.parse(e.postData.contents);

    var filename = payload.filename || ('wedding_photo_' + Date.now() + '.jpg');
    var mimeType = payload.mimeType || 'image/jpeg';
    var base64   = payload.data;

    if (!base64) {
      return _jsonResponse({ status: 'error', message: 'No image data received.' });
    }

    // Decode the Base64 string into a byte array and create a Blob
    var decoded = Utilities.base64Decode(base64);
    var blob    = Utilities.newBlob(decoded, mimeType, filename);

    // Save to the target Google Drive folder
    var folder = DriveApp.getFolderById(FOLDER_ID);
    var file   = folder.createFile(blob);

    Logger.log('Saved file: ' + file.getName() + ' (' + file.getId() + ')');

    return _jsonResponse({
      status:   'success',
      message:  'Photo saved successfully!',
      fileId:   file.getId(),
      fileName: file.getName()
    });

  } catch (err) {
    Logger.log('Error in doPost: ' + err.toString());
    return _jsonResponse({ status: 'error', message: err.toString() });
  }
}

/**
 * Helper: returns a JSON ContentService response with permissive access.
 *
 * @param {Object} data - The response payload object.
 * @returns {ContentService.TextOutput}
 */
function _jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Optional: handle GET requests so you can verify the endpoint is live
 * by visiting the URL in a browser.
 */
function doGet(e) {
  return _jsonResponse({
    status:  'ok',
    message: 'Wedding photo upload endpoint is live.'
  });
}
