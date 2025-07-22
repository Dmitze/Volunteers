function escapeRegExp(string) {
  return String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function fileExists(folder, fileName) {
  if (!folder) return false;
  const files = folder.getFilesByName(fileName);
  return files.hasNext();
}

function onNewFormSubmit(e) {
  const templateId = "1e0a_txUrhshQgPAFHM8_sS33mRiGDe2b6TUFsQ1fmEU"; // <-- ВСТАВТЕ СВІЙ ID шаблону
  const folderId   = "1HR__Jol4t0OBsNggX4-9J92_SvXPbcCC"; // <-- ВСТАВТЕ СВІЙ ID папки
  const row        = e.values;

  const date    = new Date(row[0]);
  const dateStr = Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd");
  const contactName = String(row[6] || "").replace(/\s+/g, '_');
  const orgName     = String(row[2] || "").replace(/\s+/g, '_');
  const baseName    = `${contactName}_${orgName}_${dateStr}`;
  const fileName    = `${baseName}_GoogleDoc.docx`;

  let folder;
  try {
    folder = DriveApp.getFolderById(folderId);
  } catch (e) {
    Logger.log('❌ Папку не знайдено: ' + folderId);
    return;
  }
  if (fileExists(folder, fileName)) {
    Logger.log('📁 Документ вже існує: ' + fileName);
    return;
  }

  const copyFile = DriveApp.getFileById(templateId).makeCopy(fileName, folder);
  const doc      = DocumentApp.openById(copyFile.getId());
  const body     = doc.getBody();
  const header   = doc.getHeader ? doc.getHeader() : null;
  const footer   = doc.getFooter ? doc.getFooter() : null;

  const rawLast    = row[3] || "";
  const rawFirst   = row[4] || "";
  const combined   = `${rawLast} ${rawFirst}`.trim();
  const genderInfo = getGenderAndFormalName(combined);
  const greeting   = genderInfo.gender === 'female' ? "Шановна пані" : "Шановний пан";

  function replaceAll(ph, val) {
    const re = escapeRegExp(ph);
    body.replaceText(re, val);
    if (header) header.replaceText(re, val);
    if (footer) footer.replaceText(re, val);
  }

  replaceAll("{greeting}", greeting);
  replaceAll("{2}",      genderInfo.lastNom);
  replaceAll("{2_gen}",  genderInfo.lastGen);
  replaceAll("{2_dat}",  genderInfo.lastDat);
  replaceAll("{3}",      genderInfo.firstNom);
  replaceAll("{3_gen}",  genderInfo.firstGen);
  replaceAll("{3_dat}",  genderInfo.firstDat);

  const placeholderToIndex = [2,3,4,5,6,7,8,9,10];
  for (let i = 0; i < 9; i++) {
    if (i === 1 || i === 2) continue;
    const ph = `{${i+1}}`;
    let val;
    if (i === 7) {
      val = String(row[9] || "");
    } else {
      val = String(row[ placeholderToIndex[i] ] || "");
    }
    replaceAll(ph, val);
  }

  doc.saveAndClose();
}

function deleteAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
}

function createTrigger() {
  deleteAllTriggers();
  ScriptApp.newTrigger('onNewFormSubmit')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onFormSubmit()
    .create();
}
