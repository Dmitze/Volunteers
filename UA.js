const ukrainianDeclensionRules = {
  male: {
    родовий: [
      // { match: /(енко|юк|чук|ишин|ик)$/i,    replace: '$1' }, 
      { match: /(о)$/i,                     replace: 'а' }, // теперь Петренко → Петренка
      { match: /(ий)$/i,                    replace: 'ого' },
      { match: /(ик)$/i,                    replace: 'ика' },
      { match: /(о)$/i,                     replace: 'а' },
      { match: /(ін)$/i,                    replace: 'іна' },
      { match: /(ов)$/i,                    replace: 'ова' },
      { match: /(ев|ёв)$/i,                 replace: '$1а' },
      { match: /(ин)$/i,                    replace: 'ина' },
      { match: /(цький)$/i,                 replace: 'цького' },
      { match: /(ський|ский)$/i,            replace: 'ського' },
      // --- новые правила для мужских имён и отчеств ---
      { match: /(ий)$/i,                    replace: 'ія' }, // Василій → Василія
      { match: /(ей)$/i,                    replace: 'ея' }, // Андрей → Андрея
      { match: /(ій)$/i,                    replace: 'ія' }, // Артемій → Артемія
      { match: /(о)$/i,                     replace: 'а' },  // Олег → Олега
      { match: /(а)$/i,                     replace: 'и' },  // Микола → Миколи
      { match: /(ь)$/i,                     replace: 'я' },  // Ігорь → Ігоря
      { match: /(ич)$/i,                    replace: 'ича' }, // Миколайович → Миколайовича
      { match: /(вич)$/i,                   replace: 'вича' }, // Олександрович → Олександровича
      { match: /(й)$/i,                     replace: 'я' }, // Сергій → Сергія
      { match: /$/i,                        replace: 'а' }
    ],
    давальний: [
      // { match: /(енко|юк|чук|ишин|ик)$/i,    replace: '$1' }, 
      { match: /(о)$/i,                     replace: 'у' }, Петренко → Петренку
      { match: /(ий)$/i,                    replace: 'ому' },
      { match: /(ик)$/i,                    replace: 'ику' },
      { match: /(о)$/i,                     replace: 'у' },
      { match: /(ін)$/i,                    replace: 'іну' },
      { match: /(ов)$/i,                    replace: 'ову' },
      { match: /(ев|ёв)$/i,                 replace: '$1у' },
      { match: /(ин)$/i,                    replace: 'ину' },
      { match: /(цький)$/i,                 replace: 'цькому' },
      { match: /(ський|ский)$/i,            replace: 'ському' },
      // --- новые правила для мужских имён и отчеств ---
      { match: /(ий)$/i,                    replace: 'ію' }, // Василій → Василію
      { match: /(ей)$/i,                    replace: 'ею' }, // Андрей → Андрею
      { match: /(ій)$/i,                    replace: 'ію' }, // Артемій → Артемію
      { match: /(о)$/i,                     replace: 'у' },  // Олег → Олегу
      { match: /(а)$/i,                     replace: 'і' },  // Микола → Миколі
      { match: /(ь)$/i,                     replace: 'ю' },  // Ігорь → Ігорю
      { match: /(ич)$/i,                    replace: 'ичу' }, // Миколайович → Миколайовичу
      { match: /(вич)$/i,                   replace: 'вичу' }, // Олександрович → Олександровичу
      { match: /(й)$/i,                     replace: 'ю' }, // Сергій → Сергію
      { match: /$/i,                        replace: 'у' }
    ]
  },
  female: {
    родовий: [
      { match: /(ія)$/i,                    replace: 'ії' },
      { match: /(ова)$/i,                   replace: 'ової' },
      { match: /(ева)$/i,                   replace: 'евої' },
      { match: /(іна)$/i,                   replace: 'іни' },
      { match: /(ая)$/i,                    replace: 'ої' },
      { match: /(я)$/i,                     replace: 'і' },
      { match: /(а)$/i,                     replace: 'и' },
      { match: /(ь)$/i,                     replace: 'і' },
      // --- новые правила для женских имён и отчеств ---
      { match: /(на)$/i,                    replace: 'ни' }, // Оксана → Оксани
      { match: /(ія)$/i,                    replace: 'ії' }, // Марія → Марії
      { match: /(а)$/i,                     replace: 'и' },  // Галина → Галини
      { match: /(івна)$/i,                  replace: 'івни' }, // Василівна → Василівни
      { match: /(ївна)$/i,                  replace: 'ївни' }, // Олексіївна → Олексіївни
      { match: /(ївна)$/i,                  replace: 'ївни' }, // Іванівна → Іванівни
      { match: /$/i,                        replace: '' }
    ],
    давальний: [
      { match: /(ія)$/i,                    replace: 'ії' },
      { match: /(ова)$/i,                   replace: 'овій' },
      { match: /(ева)$/i,                   replace: 'евій' },
      { match: /(іна)$/i,                   replace: 'іні' },
      { match: /(ая)$/i,                    replace: 'ій' },
      { match: /(я)$/i,                     replace: 'ю' },
      { match: /(а)$/i,                     replace: 'і' },
      { match: /(ь)$/i,                     replace: 'і' },
      // --- новые правила для женских имён и отчеств ---
      { match: /(на)$/i,                    replace: 'ні' }, // Оксана → Оксані
      { match: /(ія)$/i,                    replace: 'ії' }, // Марія → Марії
      { match: /(а)$/i,                     replace: 'і' },  // Галина → Галині
      { match: /(івна)$/i,                  replace: 'івні' }, // Василівна → Василівні
      { match: /(ївна)$/i,                  replace: 'ївні' }, // Олексіївна → Олексіївні
      { match: /(ївна)$/i,                  replace: 'ївні' }, // Іванівна → Іванівні
      { match: /$/i,                        replace: '' }
    ]
  }
};

const indeclinableSurnames = [
  'Кім','Лі','Хо','Ма','Дюма','Гете','Хемінгуей','Сміт','Леві','Коен','Шон','Пак','Чжан','Лу','Чен','Сон','Лін','Кан','Ван','Сюй','Го','Фішер','Браун'
];

function declineUkrainianName(name, gender, caseType, forceDecline = false) {
  if (!name || typeof name !== 'string') return name;
  if (/[^а-яіїєґА-ЯІЇЄҐ\-]/.test(name)) return name;
  if (indeclinableSurnames.some(n => n.toLowerCase() === name.toLowerCase())) return name;
  if (name.length <= 3) return name;
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
      return declined === name ? name : declined;
    }
  }

  return name;
}

function declinePhrase(phrase, gender, caseType, forceDecline = false) {
  return phrase
    .split(/\s+/)
    .map(w => declineUkrainianName(w, gender, caseType, forceDecline))
    .join(' ');
}

function getGenderAndFormalName(fullName) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) {
    const f = parts.join(' ');
    return {
      gender: 'male',
      lastNom: f, lastGen: f, lastDat: f,
      firstNom: f, firstGen: f, firstDat: f
    };
  }

  const last = parts[0];
  const firstAndPatronymic = parts.slice(1).join(' ');
  const base = parts[1] || '';
  const gender = /[ая]$/i.test(base) ? 'female' : 'male';

  return {
    gender,
    lastNom: last,
    lastGen: declineUkrainianName(last, gender, 'родовий'),
    lastDat: declineUkrainianName(last, gender, 'давальний'),
    firstNom: firstAndPatronymic,
    firstGen: declinePhrase(firstAndPatronymic, gender, 'родовий', true),
    firstDat: declinePhrase(firstAndPatronymic, gender, 'давальний', true)
  };
}

function MULTI_DECLINE(fullName) {
  const {
    lastNom, firstNom,
    lastGen, firstGen,
    lastDat, firstDat
  } = getGenderAndFormalName(fullName);
  return [
    `Називний: ${lastNom} ${firstNom}`,
    `Родовий: ${lastGen} ${firstGen}`,
    `Давальний: ${lastDat} ${firstDat}`
  ];
}

function DECLINE_CASE(fullName, caseType) {
  const {
    lastNom, firstNom,
    lastGen, firstGen,
    lastDat, firstDat
  } = getGenderAndFormalName(fullName);
  switch (caseType.toLowerCase()) {
    case 'називний': return `${lastNom} ${firstNom}`;
    case 'родовий':  return `${lastGen} ${firstGen}`;
    case 'давальний': return `${lastDat} ${firstDat}`;
    default: return `${lastNom} ${firstNom}`;
  }
}


const safe = (v) => String(v || "").trim();


function fillTemplate(str, nameForms) {
  return str
    .replace(/\{2\}/g, safe(nameForms.lastNom))
    .replace(/\{2_gen\}/g, safe(nameForms.lastGen))
    .replace(/\{2_dat\}/g, safe(nameForms.lastDat))
    .replace(/\{3\}/g, safe(nameForms.firstNom))
    .replace(/\{3_gen\}/g, safe(nameForms.firstGen))
    .replace(/\{3_dat\}/g, safe(nameForms.firstDat))
    .replace(/\{full_gen\}/g, `${safe(nameForms.lastGen)} ${safe(nameForms.firstGen)}`)
    .replace(/\{full_dat\}/g, `${safe(nameForms.lastDat)} ${safe(nameForms.firstDat)}`);
}
