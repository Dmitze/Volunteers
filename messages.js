// Локалізовані повідомлення для системи
const messages = {
  uk: {
    sheetNotFound: '❌ Лист "{sheet}" не знайдено!',
    folderNotFound: '❌ Не вдалося знайти папку за ID: {id}',
    generated: '✅ Згенеровано {count} {format} документів!',
    nothingToGenerate: 'ℹ️ Нових документів для створення не знайдено.',
    fileCreated: 'Файл успішно створено!',
    error: 'Сталася помилка: {error}',
    menuTitle: 'Документи',
    menuGeneratePDF: 'Згенерувати PDF',
    menuGenerateDOCX: 'Згенерувати DOCX',
    menuTestUA: 'Тест UA',
    menuDeleteTriggers: 'Видалити тригери',
    menuChangeLang: 'Змінити мову',
    langChanged: 'Мову змінено!'
  },
  en: {
    sheetNotFound: '❌ Sheet "{sheet}" not found!',
    folderNotFound: '❌ Could not find folder by ID: {id}',
    generated: '✅ Generated {count} {format} documents!',
    nothingToGenerate: 'ℹ️ No new documents to generate.',
    fileCreated: 'File created successfully!',
    error: 'An error occurred: {error}',
    menuTitle: 'Documents',
    menuGeneratePDF: 'Generate PDF',
    menuGenerateDOCX: 'Generate DOCX',
    menuTestUA: 'Test UA',
    menuDeleteTriggers: 'Delete triggers',
    menuChangeLang: 'Change language',
    langChanged: 'Language changed!'
  }
};

/**
 * Повертає локалізоване повідомлення за ключем і мовою.
 * @param {'uk'|'en'} lang Мова ('uk' або 'en')
 * @param {string} key Ключ повідомлення
 * @param {Object} [params] Параметри для підстановки у шаблон
 * @returns {string}
 * @example
 * getMessage('uk', 'sheetNotFound', {sheet: 'Відповіді форми (1)'});
 */
function getMessage(lang, key, params) {
  let msg = (messages[lang] && messages[lang][key]) || '';
  if (params) {
    Object.keys(params).forEach(k => {
      msg = msg.replace(new RegExp(`{${k}}`, 'g'), params[k]);
    });
  }
  return msg;
}
