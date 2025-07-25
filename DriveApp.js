const lang = 'uk'; 

function generateDocumentsBatchPdf() {
  generateDocumentsBatch('pdf');
}

function generateDocumentsBatchDocx() {
  generateDocumentsBatch('docx');
}

function generateDocumentsBatch(format) {
  const ss      = SpreadsheetApp.getActiveSpreadsheet();
  const sheet   = ss.getSheetByName(config.SHEET_NAME);
  if (!sheet) {
    safeAlert(getMessage(lang, 'sheetNotFound', {sheet: config.SHEET_NAME}));
    return;
  }
  const values       = sheet.getDataRange().getValues();
  const rows         = values.slice(1);
  const templateId   = config.TEMPLATE_ID;
  const folderId     = config.FOLDER_ID;
  let folder;
  try {
    folder = DriveApp.getFolderById(folderId);
  } catch (e) {
    safeAlert(getMessage(lang, 'folderNotFound', {id: folderId}));
    return;
  }

  let generatedCount = 0;
  let processedCount = 0;

  const placeholderToIndex = [2, 3, 4, 5, 6, 7, 8, 9];

  for (let idx = 0; idx < rows.length; idx++) {
    if (processedCount >= config.PROCESS_LIMIT) break;
    const row = rows[idx];
    if (!row[2]) continue; 
    let dateObj = row[0] instanceof Date ? row[0] : new Date(row[0]);
    let dateOnly = Utilities.formatDate(dateObj, Session.getScriptTimeZone(), 'yyyy-MM-dd'); 

    const cText = String(row[2] || "").replace(/\s+/g, '_');
    const dText = String(row[3] || "").replace(/\s+/g, '_');
    const fText = String(row[5] || "").replace(/\s+/g, '_');

    const fileNameBase = `${dateOnly}_${cText}_${dText}_${fText}`;
    const fileDocx    = `${fileNameBase}.docx`;
    const filePdf     = `${fileNameBase}.pdf`;

    if ((format==='pdf'  && fileExists(folder, filePdf)) ||
        (format==='docx' && fileExists(folder, fileDocx))) {
      continue;
    }
    const copyFile = DriveApp.getFileById(templateId).makeCopy();
    const doc      = openDocWithRetry(copyFile.getId(), 7, 500);
    const body     = doc.getBody();
    const header   = doc.getHeader ? doc.getHeader() : null;
    const footer   = doc.getFooter ? doc.getFooter() : null;
    const lastName  = row[4] || ""; // E:E
    const firstName = row[5] || ""; // F:F
    const combined  = `${lastName} ${firstName}`.trim();
    const genderInfo = getGenderAndFormalName(combined);
    const greeting = genderInfo.gender === 'female'
      ? "Шановна пані"
      : "Шановний пан";

    function replaceAll(ph, value) {
      const re = escapeRegExp(ph);
      body.replaceText(re, value);
      if (header) header.replaceText(re, value);
      if (footer) footer.replaceText(re, value);
    }

    replaceAll("{greeting}", greeting);
    replaceAll("{2}",      lastName);  
    replaceAll("{2_gen}",  genderInfo.lastGen);   
    replaceAll("{2_dat}",  genderInfo.lastDat);   
    replaceAll("{3}",      firstName); 
    replaceAll("{3_gen}",  genderInfo.firstGen);  
    replaceAll("{3_dat}",  genderInfo.firstDat);  

    for (let i = 0; i < placeholderToIndex.length; i++) {
      if (i === 1 || i === 2) continue;
      const ph = `{${i+1}}`;
      const val = String(row[ placeholderToIndex[i] ] || "");
      replaceAll(ph, val);
    }

    doc.saveAndClose();
    if (format === 'pdf') {
      folder.createFile(copyFile.getAs("application/pdf").setName(filePdf));
    }
    if (format === 'docx') {
      exportDocx(copyFile.getId(), fileDocx, folder);
    }
    copyFile.setTrashed(true);
    generatedCount++;
    processedCount++;
  }
  safeAlert(
    generatedCount > 0
      ? getMessage(lang, 'generated', {count: generatedCount, format: format.toUpperCase()})
      : getMessage(lang, 'nothingToGenerate')
  );
}

function exportDocx(docId, fileName, folder) {
  const url   = "https://docs.google.com/document/d/" + docId + "/export?format=docx";
  const token = ScriptApp.getOAuthToken();
  const resp  = UrlFetchApp.fetch(url, { headers: { 'Authorization': 'Bearer ' + token } });
  const blob  = resp.getBlob().setName(fileName);
  folder.createFile(blob);
}

function openDocWithRetry(fileId, maxAttempts, delayMs) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return DocumentApp.openById(fileId);
    } catch (e) {
      if (attempt === maxAttempts) throw e;
      Utilities.sleep(delayMs);
    }
  }
}

function fileExists(folder, fileName) {
  if (!folder) return false;
  const files = folder.getFilesByName(fileName);
  return files.hasNext();
}