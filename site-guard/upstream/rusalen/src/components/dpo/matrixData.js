// ============================================================
// Базовая матрица образовательных маршрутов РУСАЛЕН (внутренний слой).
//
// Роль в системе (этап 6 пересборки ДПО):
//  - факты программ для 3D/2D-карты хранятся ТОЛЬКО здесь;
//  - подтверждённые факты (часы, формат) берутся из educationModel
//    через eduId; неподтверждённые часы — предварительные оценки
//    матрицы и показываются на карте как есть;
//  - публичный каталог и лендинги читают educationModel напрямую,
//    этот слой — источник только для карты и внутренних разборов.
//
// PROGRAMS: программы матрицы; MODULES: учебные блоки с часами
// и связями «программа:роль» (required — обязательный блок,
// choice — вариативная ветвь).
// Клиническая база — реальные ступени «Психиатрии для психологов»:
// I (96 ч) + II (144 ч), полный маршрут 240 ч.
// ============================================================

import { programById } from '@/components/education/educationModel';

// est — предварительные оценки матрицы (contact/self), если не подтверждены моделью.
const RAW = [
  { id: 'psy1', eduId: 'psy1', name: 'Психиатрия для психологов: клиническая грамотность и навигация', short: 'Психиатрия для психологов · I', formatCode: 'ПК', est: { total: 96, contact: 86, self: 10 }, goal: 'Клиническая грамотность и навигация: что я должен увидеть и не пропустить' },
  { id: 'psy2', eduId: 'psy2', name: 'Психиатрия для психологов: дифференциальная клиника и клиническая тактика', short: 'Психиатрия для психологов · II', formatCode: 'ПК', est: { total: 144, contact: 130, self: 14 }, goal: 'Дифференциальная клиника и клиническая тактика: как разобрать сложный случай' },
  { id: 'cbt', eduId: 'cbt', name: 'КПТ', short: 'КПТ', formatCode: 'ПК', est: { total: 108, contact: 76, self: 32 }, goal: 'Освоить базу КПТ и выбрать область применения' },
  { id: 'hypnosis', eduId: 'hypnosis', name: 'Гипноз', short: 'Гипноз', formatCode: 'ПК', est: { total: 108, contact: 80, self: 28 }, goal: 'Освоить психотерапевтический гипноз и выбрать дополнительные применения' },
  { id: 'transpersonal', eduId: 'transpersonal', name: 'Трансперсональная психотерапия', short: 'Трансперсональная психотерапия', formatCode: 'ПК', est: { total: 144, contact: 104, self: 40 }, goal: 'Освоить подход и входящие в него практики' },
  { id: 'pfc', eduId: 'pfc', name: 'ПФК', short: 'ПФК', formatCode: 'ПП', est: { total: 510, contact: 380, self: 130 }, goal: 'Пройти полную программу психофизиологической коррекции' },
  { id: 'stress-trauma', eduId: 'stress-trauma', name: 'Последствия стресса и психотравмы', short: 'Последствия стресса и психотравмы', formatCode: 'ПП', est: { total: 328, contact: 230, self: 98 }, goal: 'Освоить работу с последствиями стрессовых воздействий и психологической травмой' },
  { id: 'sexology', eduId: 'sexology', name: 'Сексология', short: 'Сексология', formatCode: 'ПП', est: { total: 600, contact: 434, self: 166 }, goal: 'Освоить сексологическое консультирование' },
  { id: 'addictology', eduId: 'addictology', name: 'Аддиктология', short: 'Аддиктология', formatCode: 'ПП', est: { total: 316, contact: 224, self: 92 }, goal: 'Освоить работу с зависимым поведением' },
  { id: 'psychoed', eduId: 'psychoed', name: 'Психообразование', short: 'Психообразование', formatCode: 'ПК', est: { total: 36, contact: 24, self: 12 }, goal: 'Освоить психообразование для работы в клинике психиатрии' },
  { id: 'mct-borderline', eduId: 'mct', name: 'Метакогнитивный тренинг для пограничной психиатрии и клиники неврозов', short: 'МКТ для пограничной психиатрии и клиники неврозов', formatCode: 'ПК', est: { total: 48, contact: 36, self: 12 }, goal: 'Освоить метакогнитивный тренинг для пограничной психиатрии и клиники неврозов' },
  { id: 'mct-major', eduId: 'mct', name: 'Метакогнитивный тренинг для большой психиатрии', short: 'МКТ для большой психиатрии', formatCode: 'ПК', est: { total: 48, contact: 36, self: 12 }, goal: 'Освоить метакогнитивный тренинг для большой психиатрии' },
  { id: 'orgbiz', eduId: 'orgbiz', name: 'Организационная и бизнес-психология', short: 'Организационная и бизнес-психология', formatCode: 'ПП', est: { total: 0, contact: 0, self: 0 }, goal: 'Направление в разработке: психолог в организационной и бизнес-среде' },
];

// Часы: подтверждённое в educationModel важнее оценки матрицы.
export const PROGRAMS = RAW.map((p) => {
  const edu = p.eduId ? programById(p.eduId) : null;
  return {
    id: p.id,
    eduId: p.eduId,
    name: p.name,
    short: p.short,
    formatCode: p.formatCode,
    goal: p.goal,
    hours: {
      total: edu?.hours?.total ?? p.est.total,
      contact: edu?.hours?.contact ?? p.est.contact,
      self: edu?.hours?.self ?? p.est.self,
    },
  };
});

export const AREA_ORDER = [
  'КЛИНИЧЕСКИЕ АСПЕКТЫ',
  'ПСИХОТЕРАПИЯ',
  'ОБЩИЕ МОДУЛИ',
  'ПФК',
  'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ',
  'СЕКСОЛОГИЯ',
  'АДДИКТОЛОГИЯ',
  'ПСИХООБРАЗОВАНИЕ',
  'МЕТАКОГНИТИВНЫЙ ТРЕНИНГ',
];

// Маршрутные часы программ подтверждены educationModel (ступени психиатрии);
// часы отдельных модулей — внутренние оценки матрицы для раскладки и перезачёта.
export const MODULES = [
  { id: 'psyphys', code: 'M01', label: 'Психофизиология: активность, ТФС и системное понимание человека', area: 'КЛИНИЧЕСКИЕ АСПЕКТЫ', hours: 24, programs: ['psy1:required', 'pfc:required', 'stress-trauma:required', 'sexology:required', 'addictology:required'] },
  { id: 'science', code: 'M02', label: 'Научное, критическое и психотерапевтическое мышление', area: 'КЛИНИЧЕСКИЕ АСПЕКТЫ', hours: 12, programs: ['psy1:required', 'psy2:required', 'cbt:required', 'hypnosis:required', 'transpersonal:required', 'pfc:required', 'stress-trauma:required', 'sexology:required', 'addictology:required'] },
  { id: 'ethics', code: 'M03', label: 'Этика и профессиональные границы', area: 'КЛИНИЧЕСКИЕ АСПЕКТЫ', hours: 8, programs: ['psy1:required', 'psy2:required', 'cbt:required', 'hypnosis:required', 'transpersonal:required', 'pfc:required', 'stress-trauma:required', 'sexology:required', 'addictology:required'] },
  { id: 'interview', code: 'M04', label: 'Клиническое интервью', area: 'КЛИНИЧЕСКИЕ АСПЕКТЫ', hours: 16, programs: ['psy1:required', 'psy2:required', 'cbt:required', 'hypnosis:required', 'transpersonal:required', 'pfc:required', 'stress-trauma:required', 'sexology:required', 'addictology:required'] },
  { id: 'psychiatry', code: 'M05', label: 'Психиатрия для психологов', area: 'КЛИНИЧЕСКИЕ АСПЕКТЫ', hours: 24, programs: ['psy1:required', 'psy2:required', 'stress-trauma:required', 'sexology:required', 'addictology:required'] },
  { id: 'neurology', code: 'M06', label: 'Неврология для психологов', area: 'КЛИНИЧЕСКИЕ АСПЕКТЫ', hours: 16, programs: ['psy1:required', 'psy2:required', 'stress-trauma:required', 'sexology:required', 'addictology:required'] },
  { id: 'endocrine', code: 'M07', label: 'Эндокринология для психологов', area: 'КЛИНИЧЕСКИЕ АСПЕКТЫ', hours: 12, programs: ['psy1:required', 'psy2:required', 'stress-trauma:required', 'sexology:required', 'addictology:required'] },
  { id: 'ddx', code: 'M08', label: 'Дифференциальная диагностика и интегральная формулировка случая', area: 'КЛИНИЧЕСКИЕ АСПЕКТЫ', hours: 32, programs: ['psy2:required', 'stress-trauma:required', 'sexology:required', 'addictology:required'] },
  { id: 'cbt1', code: 'M10', label: 'КПТ I: основы КПТ', area: 'ПСИХОТЕРАПИЯ', hours: 36, programs: ['cbt:required'] },
  { id: 'cbt2', code: 'M11', label: 'КПТ II: волны и направления КПТ психотерапии', area: 'ПСИХОТЕРАПИЯ', hours: 36, programs: ['cbt:required'] },
  { id: 'hyptherapy', code: 'M12', label: 'Психотерапевтический гипноз', area: 'ПСИХОТЕРАПИЯ', hours: 48, programs: ['hypnosis:required'] },
  { id: 'trbase', code: 'M14', label: 'Трансперсональная психотерапия', area: 'ПСИХОТЕРАПИЯ', hours: 36, programs: ['transpersonal:required'] },
  { id: 'breath', code: 'M15', label: 'Дыхательные практики', area: 'ПСИХОТЕРАПИЯ', hours: 24, programs: ['transpersonal:required', 'pfc:required'] },
  { id: 'holo', code: 'M16', label: 'Холотропное дыхание', area: 'ПСИХОТЕРАПИЯ', hours: 48, programs: ['transpersonal:required'] },
  { id: 'hypbase', code: 'M13', label: 'Основы гипноза', area: 'ОБЩИЕ МОДУЛИ', hours: 24, programs: ['hypnosis:required', 'pfc:required'] },
  { id: 'pfctheory', code: 'M17', label: 'Теория психофизиологической коррекции', area: 'ПФК', hours: 48, programs: ['pfc:required'] },
  { id: 'pfcassess', code: 'M18', label: 'Функциональная оценка состояния и выбор мишеней', area: 'ПФК', hours: 32, programs: ['pfc:required'] },
  { id: 'bfb', code: 'M19', label: 'Биологическая обратная связь (БОС)', area: 'ПФК', hours: 72, programs: ['pfc:required'] },
  { id: 'auto', code: 'M20', label: 'Аутогенные практики', area: 'ПФК', hours: 32, programs: ['pfc:required'] },
  { id: 'body', code: 'M21', label: 'Телесные, двигательные и кинезиологические методы', area: 'ПФК', hours: 56, programs: ['pfc:required'] },
  { id: 'hyppfc', code: 'M22', label: 'Гипноз как психофизиологическая коррекция', area: 'ПФК', hours: 48, programs: ['pfc:required'] },
  { id: 'pfcint', code: 'M23', label: 'Интеграция методов ПФК', area: 'ПФК', hours: 34, programs: ['pfc:required'] },
  { id: 'pfcpractice', code: 'M24', label: 'Практикум ПФК', area: 'ПФК', hours: 80, programs: ['pfc:required'] },
  { id: 'str1', code: 'M25', label: 'Стресс и адаптация', area: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ', hours: 16, programs: ['stress-trauma:required'] },
  { id: 'str2', code: 'M26', label: 'Острые последствия стрессовых воздействий', area: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ', hours: 16, programs: ['stress-trauma:required'] },
  { id: 'str3', code: 'M27', label: 'Хронический и накопленный стресс', area: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ', hours: 16, programs: ['stress-trauma:required'] },
  { id: 'str4', code: 'M28', label: 'Психологическая травма', area: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ', hours: 24, programs: ['stress-trauma:required'] },
  { id: 'str5', code: 'M29', label: 'Ранняя и довербальная травма', area: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ', hours: 16, programs: ['stress-trauma:required'] },
  { id: 'strint', code: 'M30', label: 'Интервью при последствиях стресса', area: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ', hours: 12, programs: ['stress-trauma:required'] },
  { id: 'strddx', code: 'M31', label: 'Дифференциальная диагностика стресс-ассоциированных состояний', area: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ', hours: 16, programs: ['stress-trauma:required'] },
  { id: 'strhelp', code: 'M32', label: 'Консультативная помощь при последствиях стресса', area: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ', hours: 24, programs: ['stress-trauma:required'] },
  { id: 'strprev', code: 'M33', label: 'Профилактика хронизации', area: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ', hours: 12, programs: ['stress-trauma:required'] },
  { id: 'strrec', code: 'M34', label: 'Восстановление и ресурсы', area: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ', hours: 16, programs: ['stress-trauma:required'] },
  { id: 'strcase', code: 'M35', label: 'Интеграция стрессового случая', area: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ', hours: 16, programs: ['stress-trauma:required'] },
  { id: 'cbtstr', code: 'M36', label: 'КПТ при последствиях стресса', area: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ', hours: 24, programs: ['cbt:choice', 'stress-trauma:choice'] },
  { id: 'hypstr', code: 'M37', label: 'Гипноз при последствиях стресса', area: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ', hours: 24, programs: ['hypnosis:choice', 'stress-trauma:choice'] },
  { id: 'pfcstr', code: 'M38', label: 'ПФК при стрессовой дизрегуляции', area: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ', hours: 24, programs: ['pfc:choice', 'stress-trauma:choice'] },
  { id: 'trstr', code: 'M68', label: 'Трансперсональная психотерапия при последствиях стресса и психотравмы', area: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ', hours: 24, programs: ['transpersonal:choice', 'stress-trauma:choice'] },
  { id: 'sex1', code: 'M39', label: 'Психология сексуальности и сексуальное здоровье', area: 'СЕКСОЛОГИЯ', hours: 60, programs: ['sexology:required'] },
  { id: 'sex2', code: 'M40', label: 'Психофизиология сексуальности', area: 'СЕКСОЛОГИЯ', hours: 48, programs: ['sexology:required'] },
  { id: 'sexrel', code: 'M41', label: 'Отношения и сексуальность пары', area: 'СЕКСОЛОГИЯ', hours: 48, programs: ['sexology:required'] },
  { id: 'sextr', code: 'M42', label: 'Сексуальная травма', area: 'СЕКСОЛОГИЯ', hours: 60, programs: ['sexology:required'] },
  { id: 'sexcons', code: 'M43', label: 'Психологическое консультирование в сексологии', area: 'СЕКСОЛОГИЯ', hours: 72, programs: ['sexology:required'] },
  { id: 'sexmed', code: 'M44', label: 'Медицинские аспекты сексологии', area: 'СЕКСОЛОГИЯ', hours: 48, programs: ['sexology:required'] },
  { id: 'sexint', code: 'M45', label: 'Тонкости интервью в сексологии', area: 'СЕКСОЛОГИЯ', hours: 36, programs: ['sexology:required'] },
  { id: 'sexddx', code: 'M46', label: 'Дифференциальная диагностика в сексологии', area: 'СЕКСОЛОГИЯ', hours: 48, programs: ['sexology:required'] },
  { id: 'sexcase', code: 'M47', label: 'Интеграция сексологического случая', area: 'СЕКСОЛОГИЯ', hours: 36, programs: ['sexology:required'] },
  { id: 'cbtsex', code: 'M48', label: 'КПТ в сексологии', area: 'СЕКСОЛОГИЯ', hours: 24, programs: ['cbt:choice', 'sexology:choice'] },
  { id: 'hypsex', code: 'M49', label: 'Гипноз в сексологической практике', area: 'СЕКСОЛОГИЯ', hours: 24, programs: ['hypnosis:choice', 'sexology:choice'] },
  { id: 'pfcsex', code: 'M50', label: 'ПФК в сексологии', area: 'СЕКСОЛОГИЯ', hours: 24, programs: ['pfc:choice', 'sexology:choice'] },
  { id: 'trsex', code: 'M69', label: 'Трансперсональная психотерапия в сексологии', area: 'СЕКСОЛОГИЯ', hours: 24, programs: ['transpersonal:choice', 'sexology:choice'] },
  { id: 'add1', code: 'M51', label: 'Теории зависимости и аддиктивного поведения', area: 'АДДИКТОЛОГИЯ', hours: 24, programs: ['addictology:required'] },
  { id: 'addtypes', code: 'M52', label: 'Химические и нехимические зависимости', area: 'АДДИКТОЛОГИЯ', hours: 32, programs: ['addictology:required'] },
  { id: 'add6', code: 'M56', label: 'Мотивация и изменение поведения', area: 'АДДИКТОЛОГИЯ', hours: 24, programs: ['addictology:required'] },
  { id: 'add8', code: 'M58', label: 'Профилактика рецидива', area: 'АДДИКТОЛОГИЯ', hours: 16, programs: ['addictology:required'] },
  { id: 'add9', code: 'M59', label: 'Семья, реабилитация и социальное восстановление', area: 'АДДИКТОЛОГИЯ', hours: 24, programs: ['addictology:required'] },
  { id: 'addint', code: 'M61', label: 'Интервью при зависимом поведении', area: 'АДДИКТОЛОГИЯ', hours: 12, programs: ['addictology:required'] },
  { id: 'addddx', code: 'M62', label: 'Дифференциальная диагностика зависимостей', area: 'АДДИКТОЛОГИЯ', hours: 24, programs: ['addictology:required'] },
  { id: 'cbtadd', code: 'M63', label: 'КПТ в аддиктологии', area: 'АДДИКТОЛОГИЯ', hours: 24, programs: ['cbt:choice', 'addictology:choice'] },
  { id: 'addcase', code: 'M64', label: 'Интеграция аддиктологического случая', area: 'АДДИКТОЛОГИЯ', hours: 16, programs: ['addictology:required'] },
  { id: 'hypadd', code: 'M67', label: 'Гипноз в аддиктологии', area: 'АДДИКТОЛОГИЯ', hours: 24, programs: ['hypnosis:choice', 'addictology:choice'] },
  { id: 'tradd', code: 'M70', label: 'Трансперсональная психотерапия в аддиктологии', area: 'АДДИКТОЛОГИЯ', hours: 24, programs: ['transpersonal:choice', 'addictology:choice'] },
  { id: 'pfcadd', code: 'M71', label: 'ПФК в аддиктологии', area: 'АДДИКТОЛОГИЯ', hours: 24, programs: ['pfc:choice', 'addictology:choice'] },
  { id: 'psychoed', code: 'M65', label: 'Психообразование', area: 'ПСИХООБРАЗОВАНИЕ', hours: 36, programs: ['psychoed:required'] },
  { id: 'mct', code: 'M66', label: 'Метакогнитивный тренинг для пограничной психиатрии и клиники неврозов', area: 'МЕТАКОГНИТИВНЫЙ ТРЕНИНГ', hours: 48, programs: ['mct-borderline:required'] },
  { id: 'mct2', code: 'M72', label: 'Метакогнитивный тренинг для большой психиатрии', area: 'МЕТАКОГНИТИВНЫЙ ТРЕНИНГ', hours: 48, programs: ['mct-major:required'] },
];