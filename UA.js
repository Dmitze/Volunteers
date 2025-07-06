function declineUkrainianName(name, gender, caseType) {
  if (!name || typeof name !== 'string') return name;
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

  const rules = {
    male: {
      родовий: [
        { match: /(ов)$/i,      replace: 'ова'     },
        { match: /(ев|ёв)$/i,   replace: '$1а'     },
        { match: /(ин)$/i,      replace: 'ина'     },
        { match: /(ын)$/i,      replace: 'ына'     },
        { match: /(ський|ский)$/i, replace: 'ського' },
        { match: /(цький)$/i,   replace: 'цького'  },
        { match: /(ий)$/i,      replace: 'ого'     },
        { match: /(о)$/i,       replace: 'а'       },  // Дмитро → Дмитра
        { match: /$/i,          replace: 'а'       }
      ],
      давальний: [
        { match: /(ов)$/i,      replace: 'ову'     },
        { match: /(ев|ёв)$/i,   replace: '$1у'     },
        { match: /(ин)$/i,      replace: 'ину'     },
        { match: /(ын)$/i,      replace: 'ыну'     },
        { match: /(ський|ский)$/i, replace: 'ському'},
        { match: /(цький)$/i,   replace: 'цькому'  },
        { match: /(ий)$/i,      replace: 'ому'     },
        { match: /(о)$/i,       replace: 'у'       },  // Дмитро → Дмитру
        { match: /$/i,          replace: 'у'       }
      ]
    },
    female: {
      родовий: [
        { match: /(ова)$/i,     replace: 'ової'    },
        { match: /(ева)$/i,     replace: 'евої'    },
        { match: /(іна)$/i,     replace: 'іни'     },
        { match: /(ая)$/i,      replace: 'ої'      },
        { match: /(я)$/i,       replace: 'і'       },
        { match: /(а)$/i,       replace: 'и'       },
        { match: /(ь)$/i,       replace: 'і'       },
        { match: /$/i,          replace: 'и'       }
      ],
      давальний: [
        { match: /(ова)$/i,     replace: 'овій'    },
        { match: /(ева)$/i,     replace: 'евій'    },
        { match: /(іна)$/i,     replace: 'іні'     },
        { match: /(ая)$/i,      replace: 'ій'      },
        { match: /(я)$/i,       replace: 'ї'       },
        { match: /(а)$/i,       replace: 'і'       },
        { match: /(ь)$/i,       replace: 'і'       },
        { match: /$/i,          replace: 'і'       }
      ]
    }
  };
  const list = rules[gender]?.[caseType];
  if (!list) return name;

  for (const {match, replace} of list) {
    if (match.test(name)) {
      return name.replace(match, replace);
    }
  }
  return name;
}

function getGenderAndFormalName(fullName) {
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

function declinePhrase(phrase, gender, caseType) {
  return phrase
    .split(/\s+/)
    .map(w => declineUkrainianName(w, gender, caseType))
    .join(' ');
}
