function FAQ() {
  const html = HtmlService.createHtmlOutput(`
    <div style="font-family:'Segoe UI',sans-serif;padding:24px;line-height:1.6;max-width:720px;margin:auto;">
      <h2 style="color:#2c3e50;margin-top:0">📄 Автоматичне створення документів з Google Форми</h2>
      
      <h3 style="color:#34495e">❓ Що це за система?</h3>
      <p>Це <strong>Google Apps Script</strong> для автоматичної генерації персоналізованих документів (PDF / DOCX) на основі відповідей із Google Форми та шаблону Google Docs.<br>
      Всі налаштування, локалізація, правила відмінювання та меню — гнучко керуються через окремі файли скрипта.</p>
      
      <h3 style="color:#34495e">⚙️ Як це працює?</h3>
      <ol style="padding-left:20px">
        <li><strong>Користувач заповнює Google Форму</strong><br>
        Наприклад: ПІБ, організація, посада, контакти тощо.</li>
        <li><strong>Дані потрапляють у Google Таблицю</strong><br>
        В лист <code>"Відповіді форми (1)"</code>.</li>
        <li><strong>Скрипт викликається вручну або автоматично</strong><br>
        Обробляє останні N відповідей (N = PROCESS_LIMIT у config.js), копіює шаблон, підставляє дані у плейсхолдери, зберігає DOCX/PDF у Google Drive.</li>
        <li><strong>Готовий файл з’являється у Google Drive</strong><br>
        Ім’я файлу формується автоматично, напр.:<br>
        <code>Гулеба_Університет_2025-07-06.pdf</code></li>
      </ol>

      <h3 style="color:#34495e">🖥️ Меню користувача</h3>
      <ul style="background:#f8f9fa;padding:16px;border-radius:8px;list-style:none;">
        <li><b>Документи</b>
          <ul style="margin-top:4px">
            <li><b>Згенерувати PDF</b> — створює PDF-документи для нових відповідей</li>
            <li><b>Згенерувати DOCX</b> — створює DOCX-документи для нових відповідей</li>
            <li><b>Тест UA</b> — тестує функції відмінювання (див. UA.js)</li>
            <li><b>Змінити мову</b> — перемикає інтерфейс (uk/en) для кожного користувача</li>
            <li><b>Видалити тригери</b> — очищає всі тригери Apps Script (корисно для адміністраторів)</li>
          </ul>
        </li>
      </ul>
      <p style="font-size:90%;color:#888;margin-top:8px;">Пояснення для кожної кнопки:
        <ul style="font-size:90%;color:#888;">
          <li><b>Згенерувати PDF/DOCX</b> — запускає генерацію документів на основі останніх відповідей у таблиці.</li>
          <li><b>Тест UA</b> — показує результат роботи функцій відмінювання (склонення імен, прізвищ, фраз).</li>
          <li><b>Змінити мову</b> — дозволяє вибрати мову інтерфейсу (українська або англійська).</li>
          <li><b>Видалити тригери</b> — видаляє всі автоматичні тригери (наприклад, якщо потрібно перевстановити автоматизацію).</li>
        </ul>
      </p>

      <h3 style="color:#34495e">📚 Де знайти більше інформації?</h3>
      <p>Детальна інструкція, приклади, структура коду, кастомізація та відповіді на часті питання — у <a href="https://github.com/Dmitze/Volunteers/blob/main/README.md" target="_blank" style="color:#2980b9;text-decoration:underline;">README на GitHub</a>.</p>

      <p style="text-align:right; color:gray; font-size:90%">Звертайтеся до адміністратора або створіть Pull Request 💡</p>
    </div>
  `).setWidth(700).setHeight(700);

  SpreadsheetApp.getUi().showModalDialog(html, "📘 FAQ — Як працює система");
}

