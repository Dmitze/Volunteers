// Конфигурация приложения
const config = {
  // Основные идентификаторы
  TEMPLATE_ID: "1e0a_txUrhshQgPAFHM8_sS33mRiGDe2b6TUFsQ1fmEU",
  DOCX_TEMPLATE_ID: "1e0a_txUrhshQgPAFHM8_sS33mRiGDe2b6TUFsQ1fmEU", // пример, можно заменить
  PDF_TEMPLATE_ID: "1e0a_txUrhshQgPAFHM8_sS33mRiGDe2b6TUFsQ1fmEU", // пример, можно заменить
  FOLDER_ID: "1HR__Jol4t0OBsNggX4-9J92_SvXPbcCC",
  DOCX_FOLDER_ID: "1HR__Jol4t0OBsNggX4-9J92_SvXPbcCC", // пример, можно заменить
  PDF_FOLDER_ID: "1HR__Jol4t0OBsNggX4-9J92_SvXPbcCC", // пример, можно заменить
  SHEET_NAME: "Відповіді форми (1)",

  // Лимиты и параметры
  PROCESS_LIMIT: 5,
  MAX_EXPORT_SIZE: 50,

  // Локализация
  SUPPORTED_LANGS: ['uk', 'en'],
  DEFAULT_LANG: 'uk',

  // Безопасность и администрирование
  ADMIN_EMAILS: ['youremail@gmail.com'],

  // Прочие параметры (добавляйте по мере необходимости)
};

/**
 * Возвращает объект конфигурации приложения.
 * @returns {Object} Конфиг приложения
 */
function getConfig() {
  return config;
}
