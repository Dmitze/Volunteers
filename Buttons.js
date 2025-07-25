
function getUserLang() {
  const props = PropertiesService.getUserProperties();
  return props.getProperty('lang') || getConfig().DEFAULT_LANG || 'uk';
}


function setUserLang(lang) {
  PropertiesService.getUserProperties().setProperty('lang', lang);
  safeAlert(getMessage(lang, 'langChanged') || 'Мову змінено!');
}


function showLangDialog() {
  const ui = SpreadsheetApp.getUi();
  const langs = getConfig().SUPPORTED_LANGS;
  const buttons = langs.map(l => ui.ButtonSet[l.toUpperCase()] || ui.ButtonSet.OK);
  const response = ui.prompt('Виберіть мову (uk/en):', ui.ButtonSet.OK);
  const lang = response.getResponseText().toLowerCase();
  if (langs.includes(lang)) setUserLang(lang);
  else safeAlert('Невідома мова!');
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  const lang = getUserLang();
  ui.createMenu(getMessage(lang, 'menuTitle') || 'Документи')
    .addItem(getMessage(lang, 'menuGeneratePDF') || 'Згенерувати PDF', 'generateDocumentsBatchPdf')
    .addItem(getMessage(lang, 'menuGenerateDOCX') || 'Згенерувати DOCX', 'generateDocumentsBatchDocx')
    .addSeparator()
    .addItem('FAQ', 'FAQ')
    .addItem(getMessage(lang, 'menuDeleteTriggers') || 'Видалити тригери', 'deleteAllTriggers')
    .addToUi();
}


function onButtonClick() {
  safeAlert(getMessage(getUserLang(), 'fileCreated'));
}
