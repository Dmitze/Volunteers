# 📄 Автоматичне створення документів із Google Форми

Цей репозиторій містить Google Apps Script для автоматичної генерації персоналізованих документів (DOCX / PDF) на основі відповідей із Google Форми.

---

![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Made with](https://img.shields.io/badge/made%20with-Google%20Apps%20Script-blue.svg)

---

## ❓ Що це таке?

**Це система для автоматичного створення офіційних документів на базі шаблону Google Docs.**
- Дані беруться з Google Таблиці, куди потрапляють відповіді форми.
- Підтримується підстановка у шаблон у вигляді плейсхолдерів (у тілі, шапці, підвалі).
- Працює з українськими іменами, враховує відмінювання.
- Підтримує багатомовність (uk/en).
- Гнучко налаштовується через config.js.

---

## 🏗️ Архітектура та структура проекту

```
Volunteers/
├── Buttons.js        # Меню та кнопки для Google Sheets UI
├── Triger.js         # Тригери (onFormSubmit, керування тригерами)
├── DriveApp.js       # Основна бізнес-логіка генерації документів
├── UA.js             # Відмінювання, робота з іменами
├── UiUtils.js        # Утиліти для UI (alert, escapeRegExp)
├── config.js         # Всі налаштування та ідентифікатори
├── messages.js       # Локалізація (uk/en)
├── README.md         # Цей мануал
├── FAQ.js            # Часті питання
├── LICENSE           # Ліцензія
├── CONTRIBUTING.md   # Як долучитись до розробки
```

---

## ⚙️ Як це працює?

1. **Користувач заповнює Google Форму**  
   → наприклад, ім’я, посада, організація, телефон
2. **Дані потрапляють у таблицю**  
   → Лист "Відповіді форми (1)"
3. **Скрипт викликається вручну або автоматично**  
   → Обробляє останні N рядків (N = PROCESS_LIMIT у config.js)
4. **Для кожного запису:**
   - копіюється шаблон Google Docs
   - підставляються дані в плейсхолдери (`{2_gen}`, `{8}` тощо)
   - документ зберігається у вказаній папці на Google Drive

**Ім’я файлу формується автоматично, напр.:**  
`Гулеба_Університет_2025-07-06.docx`

---

## 🖥️ Меню користувача

Після встановлення скрипта у Google Таблиці з’явиться меню:

```
Документи
├─ Згенерувати PDF
├─ Згенерувати DOCX
├─ Тест UA
├─ Змінити мову
└─ Видалити тригери
```

- **Згенерувати PDF/DOCX** — створює документи для нових відповідей
- **Тест UA** — тестує функції відмінювання
- **Змінити мову** — перемикає інтерфейс (uk/en)
- **Видалити тригери** — очищає всі тригери Apps Script

---

## 🔤 Які плейсхолдери підтримуються?

| Плейсхолдер     | Опис                                             |
|------------------|--------------------------------------------------|
| `{greeting}`     | Шановний пан / Шановна пані                      |
| `{2}`            | Прізвище (називний відмінок)                    |
| `{2_gen}`        | Прізвище (родовий відмінок)                     |
| `{2_dat}`        | Прізвище (давальний відмінок)                   |
| `{3}`            | Ім’я + по батькові                              |
| `{3_gen}`        | Ім’я + по батькові (родовий)                    |
| `{3_dat}`        | Ім’я + по батькові (давальний)                  |
| `{8}`            | Колонка J (наприклад, ПІБ + телефон)            |
| `{1}`, `{4}`–`{9}` | Інші значення з таблиці                        |

> **Всі плейсхолдери можна використовувати у тілі документа, шапці (header) та підвалі (footer).**

---

## 📝 Як налаштувати?

1. **Відкрийте Google Таблицю, прикріплену до форми**
2. **Вставте скрипти з цього репозиторію у редактор Apps Script**
3. **Вкажіть свої ID шаблонів, папок у config.js**
4. **В шаблоні Google Docs вставте потрібні плейсхолдери**
5. **Перейдіть у меню → Документи → Згенерувати PDF/DOCX**
6. **(Опціонально) Налаштуйте тригер на подію onFormSubmit**

---

## 🌍 Локалізація

- Всі повідомлення, меню, алерти — через messages.js
- Підтримуються мови: uk, en (можна додати свої)
- Кожен користувач може вибрати мову через меню

---

## 🧩 Кастомізація

- **Додавайте свої плейсхолдери у шаблон і код**
- **Змінюйте правила відмінювання у UA.js**
- **Додавайте нові пункти меню у Buttons.js**
- **Змінюйте налаштування у config.js**

---

## 🧪 Тестування

- Для перевірки UA.js використовуйте пункт меню "Тест UA"
- Для unit-тестів можна запускати testUA() у редакторі Apps Script

---

## 📚 Додатково

- [FAQ.js](./FAQ.js) — відповіді на часті питання
- [CONTRIBUTING.md](./CONTRIBUTING.md) — як долучитись до розробки

---

## 📬 Зворотній зв’язок

Звертайтесь через [Telegram @Dmitry_Shiva](https://t.me/Dmitry_Shiva) або створіть Pull Request 💡

---

> 💡 Цей скрипт стане в нагоді при масовій генерації довідок, подяк, персоналізованих запрошень та іншої документації


