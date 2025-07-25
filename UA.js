const ukrainianDeclensionRules = {
  male: {
    родовий: [
      { match: /(енко|юк|чук|ишин|ський|ський|чук|ик)$/i, replace: '$1' }, 
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
      { match: /-/i,          replace: '-'       }, 
      { match: /$/i,          replace: 'а'       }
    ],
    давальний: [
      { match: /(енко|юк|чук|ишин|ський|ський|чук|ик)$/i, replace: '$1' }, 
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
      { match: /-/i,          replace: '-'       }, 
      { match: /$/i,          replace: 'у'       }
    ]
  },
  female: {
    родовий: [
      { match: /(ія)$/i,     replace: 'ії'     },
      { match: /(ова)$/i,    replace: 'ової'   },
      { match: /(ева)$/i,    replace: 'евої'   },
      { match: /(іна)$/i,    replace: 'іни'    },
      { match: /(ая)$/i,     replace: 'ої'     },
      { match: /(я)$/i,      replace: 'і'      },
      { match: /(а)$/i,      replace: 'и'      },
      { match: /(ь)$/i,      replace: 'і'      },
      { match: /(енко|юк|чук|ишин|ський|ик)$/i, replace: '$1' },
      { match: /-/i,         replace: '-'      },
      { match: /$/i,         replace: ''       }
    ],
    давальний: [
      { match: /(ія)$/i,     replace: 'ії'     },
      { match: /(ова)$/i,    replace: 'овій'   },
      { match: /(ева)$/i,    replace: 'евій'   },
      { match: /(іна)$/i,    replace: 'іні'    },
      { match: /(ая)$/i,     replace: 'ій'     },
      { match: /(я)$/i,      replace: 'ю'      },
      { match: /(а)$/i,      replace: 'у'      },
      { match: /(ь)$/i,      replace: 'і'      },
      { match: /(енко|юк|чук|ишин|ський|ик)$/i, replace: '$1' },
      { match: /-/i,         replace: '-'      },
      { match: /$/i,         replace: ''       }
    ]
  }
};

// Список не склоняемых фамилий (иностранные, короткие, на согласную)
const indeclinableSurnames = [
  'Кім','Лі','Хо','Ма','Дюма','Гете','Хемінгуей','Сміт','Леві','Коен','Шон','Пак','Чжан','Лу','Чен','Сон','Лін','Кан','Ван','Сюй','Го','Фішер','Браун'
];

function declineUkrainianName(name, gender, caseType, forceDecline = false) {
  if (!name || typeof name !== 'string') return name;
  if (/[^а-яіїєґА-ЯІЇЄҐ\-]/.test(name)) return name;
  if (indeclinableSurnames.some(n => n.toLowerCase() === name.toLowerCase())) return name;
  if (name.length <= 3) return name;
  // Только для фамилий: не склонять на согласную
  if (!forceDecline && /[бвгґджзйклмнпрстфхцчшщ]$/i.test(name)) return name;

  if (name.includes('-')) {
    return name
      .split('-')
      .map(w => declineUkrainianName(w, gender, caseType, forceDecline))
      .join('-');
  }
  const rules = ukrainianDeclensionRules[gender]?.[caseType];
  if (!rules) return name;
  for (const {match, replace} of rules) {
    if (match.test(name)) {
      const declined = name.replace(match, replace);
      if (declined === name) return name;
      return declined;
    }
  }
  return name;
}

function getGenderAndFormalName(fullName) {
  if (!fullName || typeof fullName !== 'string') {
    return { gender: 'male', lastNom: '', lastGen: '', lastDat: '', firstNom: '', firstGen: '', firstDat: '' };
  }
  const parts = fullName.trim().split(/\s+/);
  const last = parts[0] || '';
  const first = parts[1] || '';
  const patronymic = parts[2] || '';
  const gender = /[ая]$/i.test(first) || /[ая]$/i.test(patronymic) ? 'female' : 'male';
  return {
    gender,
    lastNom: last,
    lastGen: declineUkrainianName(last, gender, 'родовий'), // фамилия: обычное склонение
    lastDat: declineUkrainianName(last, gender, 'давальний'),
    firstNom: `${first} ${patronymic}`.trim(),
    firstGen: [first, patronymic].map(w => declineUkrainianName(w, gender, 'родовий', true)).join(' ').trim(), // имя и отчество: forceDecline=true
    firstDat: [first, patronymic].map(w => declineUkrainianName(w, gender, 'давальний', true)).join(' ').trim()
  };
}


function declinePhrase(phrase, gender, caseType) {
  if (!phrase || typeof phrase !== 'string') return phrase;
  return phrase
    .split(/\s+/)
    .map(w => {
      const declined = declineUkrainianName(w, gender, caseType);
      return declined === w ? w : declined;
    })
    .join(' ');
}

function decline(value, gender, caseType) {
  if (Array.isArray(value)) {
    return value.map(v => decline(v, gender, caseType));
  }
  if (typeof value === 'string' && value.includes(' ')) {
    return declinePhrase(value, gender, caseType);
  }
  return declineUkrainianName(value, gender, caseType);
}

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

globalThis.declineUkrainianName = declineUkrainianName;
globalThis.getGenderAndFormalName = getGenderAndFormalName;
globalThis.declinePhrase = declinePhrase;
globalThis.decline = decline;
globalThis.testUA = testUA;
