function onNewFormSubmit(e) {
  const config = getConfig();
  const lang = 'uk';
  if (!e || !e.values || !Array.isArray(e.values)) {
    Logger.log(getMessage(lang, 'error', {error: 'No event data'}));
    return;
  }
  const row = e.values;
  const templateId = config.TEMPLATE_ID;
  const folderId   = config.FOLDER_ID;
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
    Logger.log(getMessage(lang, 'folderNotFound', {id: folderId}));
    return;
  }
  if (fileExists(folder, fileName)) {
    Logger.log(getMessage(lang, 'fileCreated'));
    return;
  }

  const copyFile = DriveApp.getFileById(templateId).makeCopy(fileName, folder);
  const doc      = DocumentApp.openById(copyFile.getId());
  const body     = doc.getBody();
  const header   = doc.getHeader ? doc.getHeader() : null;
  const footer   = doc.getFooter ? doc.getFooter() : null;
  const rawLast = row[4] || ""; // фамилия из E:E
  const fio = (row[5] || "").trim(); // имя и отчество из F:F
  const fioParts = fio.split(/\s+/);
  const rawFirst = fioParts[0] || ""; // имя
  const rawPatron = fioParts[1] || ""; // отчество (если есть)
  const combined = `${rawLast} ${rawFirst} ${rawPatron}`.trim();
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
  replaceAll("{2_dat}",  declinePhrase(String(row[5] || ""), genderInfo.gender, "давальний")); // теперь F:F и склонение фразы
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
  Logger.log(getMessage(lang, 'fileCreated'));
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
