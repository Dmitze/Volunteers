// =require messages.js

/**
 * Показывает alert в UI Google Sheets или логирует, если UI недоступен.
 * @param {string} message Сообщение для пользователя
 * @example
 * safeAlert(getMessage('uk', 'fileCreated'));
 */
function safeAlert(message) {
  try {
    SpreadsheetApp.getUi().alert(message);
  } catch (e) {
    Logger.log(message);
  }
}

/**
 * Экранирует спецсимволы для использования в регулярных выражениях.
 * @param {string} string Входная строка
 * @returns {string} Экранированная строка
 * @example
 * const re = new RegExp(escapeRegExp('{имя}'));
 */
function escapeRegExp(string) {
  return String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
