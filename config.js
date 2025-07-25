const config = {
    TEMPLATE_ID: "",
    DOCX_TEMPLATE_ID: "", 
    PDF_TEMPLATE_ID: "", 
    FOLDER_ID: "",
    DOCX_FOLDER_ID: ", 
    PDF_FOLDER_ID: "", 
    SHEET_NAME: "Відповіді форми (1)",
    PROCESS_LIMIT: 5,
    MAX_EXPORT_SIZE: 50,
    SUPPORTED_LANGS: ['uk', 'en'],
    DEFAULT_LANG: 'uk',
    ADMIN_EMAILS: ['youremail@gmail.com'],
  };
  
  function getConfig() {
    return config;
  }
  