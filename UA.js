/**
 * UA.js — функции для склонения украинских имен, фамилий и фраз.
 * Используется для автоматизации подстановки в документы Google Apps Script.
 * Все функции экспортируются глобально.
 */

/**
 * Объект с правилами склонения для украинских фамилий и имён.
 * Ключи: пол, падеж, массив правил (регулярка + замена).
 */
const ukrainianDeclensionRules = {
  male: {
    родовий: [
      { match: /(енко|юк|чук|ишин|ський|ський|чук|ик)$/i, replace: '$1' }, // не склоняются
      { match: /(ий)$/i,      replace: 'ого'     },
      { match: /(ик)$/i,      replace: 'ика'     },
      { match: /(о)$/i,       replace: 'а'       },
      { match: /(ін)$/i,      replace: 'іна'     },
      { match: /(ов)$/i,      replace: 'ова'     },
      { match: /(ев|ёв)$/i,   replace: '$1а'     },
      { match: /(ин)$/i,      replace: 'ина'     },
      { match: /(ын)$/i,      replace: 'ына'     },
      { match: /(цький)$/i,   replace: 'цького'  },
      { match: /(ський)$/i,   replace: 'ського'  },
      { match: /-/i,          replace: '-'       }, // для двойных фамилий
      { match: /$/i,          replace: 'а'       }
    ],
    давальний: [
      { match: /(енко|юк|чук|ишин|ський|ський|чук|ик)$/i, replace: '$1' }, // не склоняются
      { match: /(ий)$/i,      replace: 'ому'     },
      { match: /(ик)$/i,      replace: 'ику'     },
      { match: /(о)$/i,       replace: 'у'       },
      { match: /(ін)$/i,      replace: 'іну'     },
      { match: /(ов)$/i,      replace: 'ову'     },
      { match: /(ев|ёв)$/i,   replace: '$1у'     },
      { match: /(ин)$/i,      replace: 'ину'     },
      { match: /(ын)$/i,      replace: 'ыну'     },
      { match: /(цький)$/i,   replace: 'цькому'  },
      { match: /(ський)$/i,   replace: 'ському'  },
      { match: /-/i,          replace: '-'       }, // для двойных фамилий
      { match: /$/i,          replace: 'у'       }
    ]
  },
  female: {
    родовий: [
      { match: /(енко|юк|чук|ишин|ський|ський|чук|ик)$/i, replace: '$1' }, // не склоняются
      { match: /(ова)$/i,     replace: 'ової'    },
      { match: /(ева)$/i,     replace: 'евої'    },
      { match: /(іна)$/i,     replace: 'іни'     },
      { match: /(ая)$/i,      replace: 'ої'      },
      { match: /(я)$/i,       replace: 'і'       },
      { match: /(а)$/i,       replace: 'и'       },
      { match: /(ь)$/i,       replace: 'і'       },
      { match: /-/i,          replace: '-'       }, // для двойных фамилий
      { match: /$/i,          replace: 'и'       }
    ],
    давальний: [
      { match: /(енко|юк|чук|ишин|ський|ський|чук|ик)$/i, replace: '$1' }, // не склоняются
      { match: /(ова)$/i,     replace: 'овій'    },
      { match: /(ева)$/i,     replace: 'евій'    },
      { match: /(іна)$/i,     replace: 'іні'     },
      { match: /(ая)$/i,      replace: 'ій'      },
      { match: /(я)$/i,       replace: 'ї'       },
      { match: /(а)$/i,       replace: 'і'       },
      { match: /(ь)$/i,       replace: 'і'       },
      { match: /-/i,          replace: '-'       }, // для двойных фамилий
      { match: /$/i,          replace: 'і'       }
    ]
  }
};

/**
 * Склоняет украинское имя/фамилию по падежу.
 * @param {string} name Имя или фамилия (поддерживает двойные фамилии через дефис)
 * @param {'male'|'female'} gender Пол ('male' или 'female')
 * @param {'родовий'|'давальний'} caseType Падеж ('родовий' или 'давальний')
 * @returns {string} Склонённое имя/фамилия
 * @example
 * declineUkrainianName('Іван', 'male', 'родовий'); // Івана
 * declineUkrainianName('Петренко', 'male', 'родовий'); // Петренко
 * declineUkrainianName('Кравчук-Іваненко', 'male', 'давальний'); // Кравчук-Іваненко
 * declineUkrainianName('Smith', 'male', 'родовий'); // Smith
 */
function declineUkrainianName(name, gender, caseType) {
  if (!name || typeof name !== 'string') return name;
  // Исключения и иностранные фамилии (латиница, не склоняются)
  if (/[^а-яіїєґА-ЯІЇЄҐ\-]/.test(name)) return name;
  const indeclinable = [
    'Кім','Лі','Хо','Ма','Дюма','Гете','Хемінгуей'
  ];
  if (indeclinable.some(n => n.toLowerCase() === name.toLowerCase())) {
    return name;
  }
  if (name.includes('-')) {
    return name
      .split('-')
      .map(w => declineUkrainianName(w, gender, caseType))
      .join('-');
  }
  const rules = ukrainianDeclensionRules[gender]?.[caseType];
  if (!rules) return name;
  for (const {match, replace} of rules) {
    if (match.test(name)) {
      return name.replace(match, replace);
    }
  }
  return name;
}

/**
 * Определяет пол и формальное имя по ФИО.
 * @param {string} fullName ФИО (например, 'Іван Петренко')
 * @returns {{gender: 'male'|'female', formalName: string}} Объект с полом и формальным именем
 * @example
 * getGenderAndFormalName('Іван Петренко');
 */
function getGenderAndFormalName(fullName) {
  if (!fullName || typeof fullName !== 'string') {
    return { gender: 'male', lastNom: '', lastGen: '', lastDat: '', firstNom: '', firstGen: '', firstDat: '' };
  }
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) {
    const f = parts.join(' ');
    return { gender: 'male', lastNom: f, lastGen: f, lastDat: f,
             firstNom: f, firstGen: f, firstDat: f };
  }
  const last    = parts.shift();
  const first   = parts.join(' ');
  const base    = parts[0] || '';
  // всі, що не на -а / -я → чоловіки
  const gender  = /[ая]$/i.test(base) ? 'female' : 'male';

  return {
    gender,
    lastNom:  last,
    lastGen:  declineUkrainianName(last, gender, 'родовий'),
    lastDat:  declineUkrainianName(last, gender, 'давальний'),
    firstNom: first,
    firstGen: declinePhrase(first, gender, 'родовий'),
    firstDat: declinePhrase(first, gender, 'давальний')
  };
}

/**
 * Склоняет фразу по падежу с учетом пола.
 * @param {string} phrase Фраза
 * @param {'male'|'female'} gender Пол
 * @param {'родовий'|'давальний'} caseType Падеж
 * @returns {string} Склонённая фраза
 * @example
 * declinePhrase('Шановний пан Іван', 'male', 'давальний');
 */
function declinePhrase(phrase, gender, caseType) {
  if (!phrase || typeof phrase !== 'string') return phrase;
  return phrase
    .split(/\s+/)
    .map(w => declineUkrainianName(w, gender, caseType))
    .join(' ');
}

/**
 * Универсальная функция склонения (имя, фраза, массив).
 * @param {string|string[]} value
 * @param {'male'|'female'} gender
 * @param {'родовий'|'давальний'} caseType
 * @returns {string|string[]}
 * @example
 * decline(['Іван', 'Олена', 'Петренко'], 'male', 'родовий');
 * decline('Кравчук-Іваненко', 'male', 'давальний');
 * decline('Smith', 'male', 'родовий');
 */
function decline(value, gender, caseType) {
  if (Array.isArray(value)) {
    return value.map(v => decline(v, gender, caseType));
  }
  if (typeof value === 'string' && value.includes(' ')) {
    return declinePhrase(value, gender, caseType);
  }
  return declineUkrainianName(value, gender, caseType);
}

/**
 * Тестовая функция для проверки работы склонения.
 * Выводит результаты в Logger (для Google Apps Script).
 */
function testUA() {
  Logger.log('declineUkrainianName("Петренко", "male", "родовий"):', declineUkrainianName('Петренко', 'male', 'родовий'));
  Logger.log('declineUkrainianName("Кравчук", "male", "давальний"):', declineUkrainianName('Кравчук', 'male', 'давальний'));
  Logger.log('declineUkrainianName("Гончаренко", "female", "родовий"):', declineUkrainianName('Гончаренко', 'female', 'родовий'));
  Logger.log('declineUkrainianName("Сміт", "male", "родовий"):', declineUkrainianName('Сміт', 'male', 'родовий'));
  Logger.log('declineUkrainianName("Дюма", "male", "родовий"):', declineUkrainianName('Дюма', 'male', 'родовий'));
  Logger.log('declineUkrainianName("Кравчук-Іваненко", "male", "давальний"):', declineUkrainianName('Кравчук-Іваненко', 'male', 'давальний'));
  Logger.log('declineUkrainianName("Smith", "male", "родовий"):', declineUkrainianName('Smith', 'male', 'родовий'));
  Logger.log('decline(["Іван", "Олена", "Петренко"], "male", "родовий"):', decline(['Іван', 'Олена', 'Петренко'], 'male', 'родовий'));
  Logger.log('decline("", "male", "родовий"):', decline('', 'male', 'родовий'));
  Logger.log('decline(null, "male", "родовий"):', decline(null, 'male', 'родовий'));
}

// Экспорт для модульности (например, для clasp + node)
globalThis.declineUkrainianName = declineUkrainianName;
globalThis.getGenderAndFormalName = getGenderAndFormalName;
globalThis.declinePhrase = declinePhrase;
globalThis.decline = decline;
globalThis.testUA = testUA;
