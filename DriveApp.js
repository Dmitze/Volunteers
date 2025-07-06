function escapeRegExp(string) {
  return String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function safeAlert(message) {
  try {
    SpreadsheetApp.getUi().alert(message);
  } catch (e) {
    Logger.log(message);
  }
}

function generateDocumentsBatchPdf() {
  generateDocumentsBatch('pdf');
}

function generateDocumentsBatchDocx() {
  generateDocumentsBatch('docx');
}

function generateDocumentsBatchDocx() {
  generateDocumentsBatch('docx');
}

function generateDocumentsBatchDocx() {
  generateDocumentsBatch('docx');
}

function generateDocumentsBatch(format) {
  const ss      = SpreadsheetApp.getActiveSpreadsheet();
  const sheet   = ss.getSheetByName("Відповіді форми (1)");
  if (!sheet) {
    safeAlert('❌ Лист "Відповіді форми (1)" не знайдено!');
    return;
  }
  const values       = sheet.getDataRange().getValues();
  const rows         = values.slice(1);
  const templateId   = "1e0a_txUrhshQgPAFHM8_sS33mRiGDe2b6TUFsQ1fmEU";
  const folderId     = "1HR__Jol4t0OBsNggX4-9J92_SvXPbcCC";
  let folder;
  try {
    folder = DriveApp.getFolderById(folderId);
  } catch (e) {
    safeAlert('❌ Не вдалося знайти папку за ID: ' + folderId);
    return;
  }

  let generatedCount = 0;
  let processedCount = 0;
  const placeholderToIndex = [2,3,4,5,6,7,8,9,10];
  for (let idx = 0; idx < rows.length; idx++) {
    if (processedCount >= 5) break;
    const row = rows[idx];
    if (!row[2]) continue;
    const date    = new Date(row[0]);
    const dateStr = Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd");
    const contactName = String(row[6] || "").replace(/\s+/g, '_');
    const orgName     = String(row[2] || "").replace(/\s+/g, '_');
    const baseName    = `${contactName}_${orgName}_${dateStr}`;
    const fileDocx    = `${baseName}.docx`;
    const filePdf     = `${baseName}.pdf`;
    if ((format==='pdf'  && fileExists(folder, filePdf)) ||
        (format==='docx' && fileExists(folder, fileDocx))) {
      continue;
    }
    const copyFile = DriveApp.getFileById(templateId).makeCopy();
    const doc      = openDocWithRetry(copyFile.getId(), 7, 500);
    const body     = doc.getBody();
    const header   = doc.getHeader ? doc.getHeader() : null;
    const footer   = doc.getFooter ? doc.getFooter() : null;
    const rawLast    = row[3] || "";      // D
    const rawFirst   = row[4] || "";      // E
    const combined   = `${rawLast} ${rawFirst}`.trim();
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
    replaceAll("{2}",      genderInfo.lastNom);
    replaceAll("{2_gen}",  genderInfo.lastGen);
    replaceAll("{2_dat}",  genderInfo.lastDat);
    replaceAll("{3}",      genderInfo.firstNom);
    replaceAll("{3_gen}",  genderInfo.firstGen);
    replaceAll("{3_dat}",  genderInfo.firstDat);

    for (let i = 0; i < 9; i++) {
      if (i === 1 || i === 2) continue;
      const ph = `{${i+1}}`;
      let val;
      if (i === 7) {
        // {8} → колонка J → row[9]
        val = String(row[9] || "");
      } else {
        val = String(row[ placeholderToIndex[i] ] || "");
      }
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
      ? `✅ Згенеровано ${generatedCount} ${format.toUpperCase()} документів!`
      : 'ℹ️ Нових документів для створення не знайдено.'
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
