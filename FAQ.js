function FAQ() {
  const html = HtmlService.createHtmlOutput(`
    <div style="font-family:'Segoe UI',sans-serif;padding:24px;line-height:1.6;max-width:680px;margin:auto;">
      <h2 style="color:#2c3e50;margin-top:0">📄 Автоматичне створення документів з Google Форми</h2>
      
      <h3 style="color:#34495e">❓ Що це взагалі?</h3>
      <p>Це система, яка <strong>автоматично генерує документи</strong> (PDF або DOCX) на основі Google Форми та Google Документів.</p>
      <p>Відповіді заповнюються в таблиці, а скрипт створює індивідуальні документи з шаблону — із підставленням даних у таблиці.</p>
      
      <h3 style="color:#34495e">⚙️ Як воно працює?</h3>
      <ol style="padding-left:20px">
        <li><strong>Користувач заповнює Google Форму</strong><br>
        Наприклад: ПІБ, назва організації, посада, контакти тощо.</li>

        <li><strong>Дані потрапляють у таблицю</strong><br>
        Вони зберігаються в листі <code>"Відповіді форми (1)"</code>.</li>

        <li><strong>Скрипт автоматично викликається</strong> (або вручну з меню)<br>
        Він обробляє останні 5 відповідей і для кожної:
          <ul style="margin-top:4px">
            <li>копіює шаблон документа,</li>
            <li>підставляє значення у документ тощо,</li>
            <li>зберігає DOCX або PDF у вказану папку.</li>
          </ul>
        </li>

        <li><strong>Готовий файл з’являється в Google Drive</strong><br>
        Ім’я файлу форматується як:<br>
        <code>ПІБ контактної особи від В\Ч_Назва установи_Позначка часу.pdf</code></li>
      </ol>

      <p style="text-align:right; color:gray; font-size:90%">Звертайтеся до адміністратова</p>
    </div>
  `).setWidth(600).setHeight(600);

  SpreadsheetApp.getUi().showModalDialog(html, "📘 FAQ — Як працює система");
}

