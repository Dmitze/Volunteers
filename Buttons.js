function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📄 Генератор документів')
    .addItem('🖨️ Створити PDF', 'generateDocumentsBatchPdf')
    .addItem('📘 Створити DOCX', 'generateDocumentsBatchDocx')
    .addItem('❓ FAQ', 'FAQ')
    .addToUi();
}
