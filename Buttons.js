// =require config.js
// =require UiUtils.js
// =require UA.js
// =require messages.js

/**
 * Buttons.js — добавляет пользовательское меню и кнопки в Google Sheets.
 * Позволяет запускать основные функции скрипта через UI.
 */

/**
 * Получает язык пользователя из PropertiesService или возвращает язык по умолчанию.
 * @returns {string}
 */
function getUserLang() {
  const props = PropertiesService.getUserProperties();
  return props.getProperty('lang') || getConfig().DEFAULT_LANG || 'uk';
}

/**
 * Устанавливает язык пользователя в PropertiesService.
 * @param {string} lang
 */
function setUserLang(lang) {
  PropertiesService.getUserProperties().setProperty('lang', lang);
  safeAlert(getMessage(lang, 'langChanged') || 'Мову змінено!');
}

/**
 * Показывает диалог выбора языка.
 */
function showLangDialog() {
  const ui = SpreadsheetApp.getUi();
  const langs = getConfig().SUPPORTED_LANGS;
  const buttons = langs.map(l => ui.ButtonSet[l.toUpperCase()] || ui.ButtonSet.OK);
  const response = ui.prompt('Виберіть мову (uk/en):', ui.ButtonSet.OK);
  const lang = response.getResponseText().toLowerCase();
  if (langs.includes(lang)) setUserLang(lang);
  else safeAlert('Невідома мова!');
}

/**
 * Добавляет пользовательское меню при открытии таблицы.
 */
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

/**
 * Пример функции для кнопки (можно добавить свои).
 */
function onButtonClick() {
  safeAlert(getMessage(getUserLang(), 'fileCreated'));
}
