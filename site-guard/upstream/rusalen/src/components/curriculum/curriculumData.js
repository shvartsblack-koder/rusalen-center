// ============================================================
// Топология 3D-карты образовательных маршрутов РУСАЛЕН.
//
// Факты программ (названия, формат, часы) здесь НЕ хранятся:
// они читаются из базовой матрицы (dpo/matrixData), которая
// синхронизирована с educationModel. Этот файл отвечает только
// за раскладку модулей, связи и принадлежность модулей программам.
//
// Клиническая база на карте — реальные ступени «Психиатрии для
// психологов»: I (96 ч) и II (144 ч), полный маршрут 240 ч.
// ============================================================

import { PROGRAMS } from '@/components/dpo/matrixData';

export const C = {
  core: '#60a5fa', med: '#2dd4bf', pt: '#c084fc', pfc: '#4ade80', stress: '#fbbf24',
  sex: '#f472b6', add: '#fb923c', stand: '#94a3b8', club: '#cbd5e1',
};

// Отображаемые имена программ — короткие имена из базовой матрицы.
const PN = (id) => PROGRAMS.find((p) => p.id === id)?.short;
const PSY1 = PN('psy1');
const PSY2 = PN('psy2');
const CBT = PN('cbt');
const HYP = PN('hypnosis');
const TR = PN('transpersonal');
const PFC = PN('pfc');
const STRESS = PN('stress-trauma');
const SEX = PN('sexology');
const ADD = PN('addictology');
const PSYED = PN('psychoed');
const MCT1 = PN('mct-borderline');
const MCT2 = PN('mct-major');

// id базовой матрицы → имя программы (для панелей и маршрутов)
export const programKeyByMatrixId = Object.fromEntries(PROGRAMS.map((p) => [p.id, p.short]));

// Единый кластер программ для внедрения в психиатрию
const PSY_CLUSTER = 'ПРОГРАММЫ ДЛЯ ВНЕДРЕНИЯ В КЛИНИКО-ПСИХОЛОГИЧЕСКУЮ РАБОТУ В ПСИХИАТРИИ';

export const nodes = [];
export const edges = [];
function N(id, label, x, y, z, group, programs = [], opts = {}) {
  nodes.push({
    id, label, x, y, z, group, programs,
    exam: !!opts.exam, shared: !!opts.shared, note: opts.note || '',
    type: opts.type || 'module',
  });
}
function E(a, b, type = 'req') { edges.push({ a, b, type }); }

// ===== КЛИНИЧЕСКИЕ АСПЕКТЫ: общая база (M01–M08) =====
// Ступень I — фундамент и клиническая грамотность; ступень II добавляет дифференциальную диагностику.
N('psyphys', 'Психофизиология: активность, ТФС и системное понимание человека', 0, 0, 0, 'core', [PSY1, PFC, STRESS, SEX, ADD], { exam: true, shared: true, note: 'Фундаментальный модуль. Изучается один раз и используется в разных маршрутах.' });
N('science', 'Научное, критическое и психотерапевтическое мышление', -105, 5, 40, 'core', [PSY1, PSY2, CBT, HYP, TR, PFC, STRESS, SEX, ADD], { exam: true, shared: true, note: 'Общий модуль всех психотерапевтических и прикладных программ.' });
N('ethics', 'Этика и профессиональные границы', 105, 5, 40, 'core', [PSY1, PSY2, CBT, HYP, TR, PFC, STRESS, SEX, ADD], { exam: true, shared: true });
N('interview', 'Клиническое интервью', 0, 35, -110, 'core', [PSY1, PSY2, CBT, HYP, TR, PFC, STRESS, SEX, ADD], { exam: true, shared: true, note: 'Теоретическая часть может подтверждаться отдельно; практический навык требует демонстрации.' });
N('psychiatry', 'Психиатрия для психологов', -125, 150, -35, 'med', [PSY1, PSY2, STRESS, SEX, ADD], { exam: true, shared: true });
N('neurology', 'Неврология для психологов', 0, 165, -10, 'med', [PSY1, PSY2, STRESS, SEX, ADD], { exam: true, shared: true });
N('endocrine', 'Эндокринология для психологов', 125, 150, -35, 'med', [PSY1, PSY2, STRESS, SEX, ADD], { exam: true, shared: true });
N('ddx', 'Дифференциальная диагностика и интегральная формулировка случая', 0, 285, 0, 'med', [PSY2, STRESS, SEX, ADD], { shared: true, note: 'Единый интегративный модуль: проверка альтернативных гипотез, синтез данных интервью и медицинской базы.' });
E('psyphys', 'psychiatry', 'assoc'); E('psyphys', 'neurology', 'assoc'); E('psyphys', 'endocrine', 'assoc');
E('psychiatry', 'ddx'); E('neurology', 'ddx'); E('endocrine', 'ddx'); E('interview', 'ddx'); E('science', 'ddx', 'assoc'); E('psyphys', 'ddx', 'assoc');

// ===== ПСИХОТЕРАПИЯ (M10–M12, M14–M16) =====
N('cbt1', 'КПТ I: основы КПТ', -500, 155, 30, 'pt', [CBT], { exam: true, note: 'Базовый модуль КПТ: основы, модель и концептуализация.' });
N('cbt2', 'КПТ II: волны и направления КПТ психотерапии', -590, 235, 30, 'pt', [CBT], { note: 'Обзор волн и направлений КПТ. После этого открываются прикладные специализации.' });
N('hyptherapy', 'Психотерапевтический гипноз', -505, 270, -155, 'pt', [HYP]);
N('trbase', 'Трансперсональная психотерапия', -360, 245, 185, 'pt', [TR], { note: 'Объединённый модуль: основы, изменённые состояния сознания и интеграция опыта.' });
N('breath', 'Дыхательные практики', -105, 315, 255, 'pt', [TR, PFC], { shared: true, note: 'Общий модуль ПФК и трансперсональной психотерапии.' });
N('holo', 'Холотропное дыхание', -360, 405, 255, 'pt', [TR]);
E('science', 'cbt1'); E('cbt1', 'cbt2'); E('science', 'hypbase', 'assoc'); E('hypbase', 'hyptherapy'); E('science', 'trbase'); E('trbase', 'breath', 'shared'); E('trbase', 'holo'); E('breath', 'holo');

// ===== ОБЩИЕ МОДУЛИ (M13) =====
N('hypbase', 'Основы гипноза', -420, 175, -135, 'pt', [HYP, PFC], { exam: true, shared: true, note: 'Один базовый модуль. Далее расходится на психотерапевтическое и психофизиологическое применение.' });

// ===== ПФК — отдельный блок (M17–M24, программа ПФК) =====
N('pfctheory', 'Теория психофизиологической коррекции', 380, 90, 0, 'pfc', [PFC]);
N('pfcassess', 'Функциональная оценка состояния и выбор мишеней', 455, 175, 0, 'pfc', [PFC]);
N('bfb', 'Биологическая обратная связь (БОС)', 560, 250, -110, 'pfc', [PFC]);
N('auto', 'Аутогенные практики', 610, 260, 15, 'pfc', [PFC]);
N('body', 'Телесные, двигательные и кинезиологические методы', 550, 250, 145, 'pfc', [PFC]);
N('hyppfc', 'Гипноз как психофизиологическая коррекция', 455, 325, -120, 'pfc', [PFC]);
N('pfcint', 'Интеграция методов ПФК', 520, 415, 30, 'pfc', [PFC]);
N('pfcpractice', 'Практикум ПФК', 430, 510, 20, 'pfc', [PFC]);
E('psyphys', 'pfctheory'); E('pfctheory', 'pfcassess'); E('pfcassess', 'bfb'); E('pfcassess', 'auto'); E('pfcassess', 'body'); E('breath', 'pfcassess', 'shared'); E('hypbase', 'hyppfc', 'shared'); E('pfcassess', 'hyppfc'); E('bfb', 'pfcint'); E('auto', 'pfcint'); E('body', 'pfcint'); E('breath', 'pfcint', 'shared'); E('hyppfc', 'pfcint'); E('pfcint', 'pfcpractice');

// ===== ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ =====
N('str1', 'Стресс и адаптация', -120, 120, 510, 'stress', [STRESS]);
N('str2', 'Острые последствия стрессовых воздействий', -30, 195, 560, 'stress', [STRESS]);
N('str3', 'Хронический и накопленный стресс', 100, 190, 555, 'stress', [STRESS]);
N('str4', 'Психологическая травма', -145, 275, 620, 'stress', [STRESS]);
N('str5', 'Ранняя и довербальная травма', 45, 285, 650, 'stress', [STRESS]);
N('strint', 'Интервью при последствиях стресса', -120, 365, 560, 'stress', [STRESS]);
N('strddx', 'Дифференциальная диагностика стресс-ассоциированных состояний', 40, 385, 575, 'stress', [STRESS]);
N('strhelp', 'Консультативная помощь при последствиях стресса', 150, 340, 620, 'stress', [STRESS]);
N('strprev', 'Профилактика хронизации', -55, 465, 650, 'stress', [STRESS]);
N('strrec', 'Восстановление и ресурсы', 110, 465, 610, 'stress', [STRESS]);
N('strcase', 'Интеграция стрессового случая', 30, 555, 600, 'stress', [STRESS]);
N('cbtstr', 'КПТ при последствиях стресса', -260, 440, 500, 'stress', [STRESS, CBT], { type: 'bridge' });
N('hypstr', 'Гипноз при последствиях стресса', -340, 500, 440, 'stress', [STRESS, HYP], { type: 'bridge' });
N('trstr', 'Трансперсональная психотерапия при последствиях стресса и психотравмы', -420, 470, 450, 'stress', [STRESS, TR], { type: 'bridge' });
N('pfcstr', 'ПФК при стрессовой дизрегуляции', 300, 465, 505, 'stress', [STRESS, PFC], { type: 'bridge' });
E('psyphys', 'str1', 'shared'); E('str1', 'str2'); E('str1', 'str3'); E('str2', 'str4'); E('str3', 'str4'); E('str4', 'str5');
E('interview', 'strint', 'bridge'); E('ddx', 'strddx', 'bridge'); E('str4', 'strint'); E('str4', 'strddx'); E('strint', 'strhelp'); E('strddx', 'strhelp');
E('strhelp', 'strprev'); E('strprev', 'strrec'); E('strrec', 'strcase');
E('cbt2', 'cbtstr', 'bridge'); E('str4', 'cbtstr', 'bridge');
E('hyptherapy', 'hypstr', 'bridge'); E('str4', 'hypstr', 'bridge');
E('trbase', 'trstr', 'bridge'); E('str4', 'trstr', 'bridge');
E('pfcint', 'pfcstr', 'bridge'); E('str3', 'pfcstr', 'bridge');
E('cbtstr', 'strcase', 'assoc'); E('hypstr', 'strcase', 'assoc'); E('trstr', 'strcase', 'assoc'); E('pfcstr', 'strcase', 'assoc');

// ===== СЕКСОЛОГИЯ =====
N('sex1', 'Психология сексуальности и сексуальное здоровье', -100, 120, -520, 'sex', [SEX]);
N('sex2', 'Психофизиология сексуальности', 35, 190, -570, 'sex', [SEX]);
N('sexrel', 'Отношения и сексуальность пары', -110, 275, -615, 'sex', [SEX]);
N('sextr', 'Сексуальная травма', 70, 275, -640, 'sex', [SEX]);
N('sexcons', 'Психологическое консультирование в сексологии', 0, 365, -610, 'sex', [SEX]);
N('sexmed', 'Медицинские аспекты сексологии', -60, 300, -500, 'sex', [SEX]);
N('sexint', 'Тонкости интервью в сексологии', 225, 255, -510, 'sex', [SEX]);
N('sexddx', 'Дифференциальная диагностика в сексологии', 0, 450, -565, 'sex', [SEX]);
N('sexcase', 'Интеграция сексологического случая', 0, 550, -590, 'sex', [SEX]);
N('cbtsex', 'КПТ в сексологии', -270, 455, -500, 'sex', [SEX, CBT], { type: 'bridge' });
N('hypsex', 'Гипноз в сексологической практике', -345, 510, -430, 'sex', [SEX, HYP], { type: 'bridge' });
N('trsex', 'Трансперсональная психотерапия в сексологии', -420, 480, -450, 'sex', [SEX, TR], { type: 'bridge' });
N('pfcsex', 'ПФК в сексологии', 300, 475, -500, 'sex', [SEX, PFC], { type: 'bridge' });
E('psyphys', 'sex1', 'shared'); E('sex1', 'sex2'); E('sex1', 'sexrel'); E('sex1', 'sextr'); E('sexrel', 'sexcons'); E('sextr', 'sexcons');
E('psychiatry', 'sexmed', 'bridge'); E('neurology', 'sexmed', 'bridge'); E('endocrine', 'sexmed', 'bridge');
E('interview', 'sexint', 'bridge'); E('ddx', 'sexddx', 'bridge');
E('sexmed', 'sexddx'); E('sexint', 'sexddx'); E('sexcons', 'sexddx'); E('sexddx', 'sexcase');
E('cbt2', 'cbtsex', 'bridge'); E('sexcons', 'cbtsex', 'bridge');
E('hyptherapy', 'hypsex', 'bridge'); E('sexcons', 'hypsex', 'bridge');
E('trbase', 'trsex', 'bridge'); E('sexcons', 'trsex', 'bridge');
E('pfcint', 'pfcsex', 'bridge'); E('sex2', 'pfcsex', 'bridge');
E('cbtsex', 'sexcase', 'assoc'); E('hypsex', 'sexcase', 'assoc'); E('trsex', 'sexcase', 'assoc'); E('pfcsex', 'sexcase', 'assoc');

// ===== АДДИКТОЛОГИЯ =====
N('add1', 'Теории зависимости и аддиктивного поведения', -70, -180, 80, 'add', [ADD]);
N('addtypes', 'Химические и нехимические зависимости', -120, -265, 125, 'add', [ADD]);
N('add6', 'Мотивация и изменение поведения', -190, -430, 90, 'add', [ADD]);
N('add8', 'Профилактика рецидива', 155, -430, 70, 'add', [ADD]);
N('add9', 'Семья, реабилитация и социальное восстановление', 0, -535, 65, 'add', [ADD]);
N('addint', 'Интервью при зависимом поведении', 300, -250, 35, 'add', [ADD]);
N('addddx', 'Дифференциальная диагностика зависимостей', 0, -610, 0, 'add', [ADD]);
N('cbtadd', 'КПТ в аддиктологии', -300, -565, 120, 'add', [ADD, CBT], { type: 'bridge' });
N('hypadd', 'Гипноз в аддиктологии', -390, -610, 120, 'add', [ADD, HYP], { type: 'bridge' });
N('tradd', 'Трансперсональная психотерапия в аддиктологии', -450, -545, 160, 'add', [ADD, TR], { type: 'bridge' });
N('pfcadd', 'ПФК в аддиктологии', 300, -570, 100, 'add', [ADD, PFC], { type: 'bridge' });
N('addcase', 'Интеграция аддиктологического случая', 0, -700, 0, 'add', [ADD]);
E('psyphys', 'add1', 'shared'); E('add1', 'addtypes'); E('addtypes', 'add6'); E('add6', 'add8'); E('add6', 'add9'); E('add8', 'add9');
E('interview', 'addint', 'bridge'); E('ddx', 'addddx', 'bridge');
E('addint', 'addddx'); E('addtypes', 'addddx'); E('add9', 'addddx'); E('addddx', 'addcase');
E('cbt2', 'cbtadd', 'bridge'); E('add6', 'cbtadd', 'bridge');
E('hyptherapy', 'hypadd', 'bridge'); E('add6', 'hypadd', 'bridge');
E('trbase', 'tradd', 'bridge'); E('add6', 'tradd', 'bridge');
E('pfcint', 'pfcadd', 'bridge'); E('add6', 'pfcadd', 'bridge');
E('cbtadd', 'addcase', 'assoc'); E('hypadd', 'addcase', 'assoc'); E('tradd', 'addcase', 'assoc'); E('pfcadd', 'addcase', 'assoc');

// ===== ПРОГРАММЫ ДЛЯ ВНЕДРЕНИЯ В ПСИХИАТРИИ =====
N('psychoed', 'Психообразование', -10, -210, -440, 'stand', [PSYED], { note: 'Программа для клинического психолога: психообразование в практике психиатрии.' });
N('mct', 'Метакогнитивный тренинг для пограничной психиатрии и клиники неврозов', 170, -220, -440, 'stand', [MCT1], { note: 'Программа для применения в пограничной психиатрии и клинике неврозов, стационарно и амбулаторно.' });
N('mct2', 'Метакогнитивный тренинг для большой психиатрии', 290, -150, -440, 'stand', [MCT2], { note: 'Программа для применения в большой психиатрии, стационарно и амбулаторно.' });

// ===== ПРОФЕССИОНАЛЬНАЯ СРЕДА =====
N('club', 'Профессиональное сообщество / практика / супервизия / интервизия / case labs / вебинары', 0, -80, 780, 'club', ['Профессиональное сообщество'], { type: 'environment', note: 'Поперечная профессиональная среда вокруг всей системы. Не равна формальному учебному модулю.' });
E('ddx', 'club', 'assoc'); E('pfcpractice', 'club', 'assoc'); E('strcase', 'club', 'assoc'); E('sexcase', 'club', 'assoc'); E('addcase', 'club', 'assoc');

// ===== Маршруты программ (id модулей) =====
export const programs = {
  'Все программы': null,
  [PSY1]: ['psyphys', 'science', 'ethics', 'interview', 'psychiatry', 'neurology', 'endocrine'],
  [PSY2]: ['science', 'ethics', 'interview', 'psychiatry', 'neurology', 'endocrine', 'ddx'],
  [CBT]: ['science', 'ethics', 'interview', 'cbt1', 'cbt2', 'cbtstr', 'cbtsex', 'cbtadd'],
  [HYP]: ['science', 'ethics', 'interview', 'hypbase', 'hyptherapy', 'hypstr', 'hypsex', 'hypadd'],
  [TR]: ['science', 'ethics', 'interview', 'trbase', 'breath', 'holo', 'trstr', 'trsex', 'tradd'],
  [PFC]: ['psyphys', 'science', 'ethics', 'interview', 'hypbase', 'breath', 'pfctheory', 'pfcassess', 'bfb', 'auto', 'body', 'hyppfc', 'pfcint', 'pfcpractice', 'pfcstr', 'pfcsex', 'pfcadd'],
  [STRESS]: ['psyphys', 'science', 'ethics', 'interview', 'psychiatry', 'neurology', 'endocrine', 'ddx', 'str1', 'str2', 'str3', 'str4', 'str5', 'strint', 'strddx', 'strhelp', 'strprev', 'strrec', 'strcase', 'cbtstr', 'hypstr', 'trstr', 'pfcstr'],
  [SEX]: ['psyphys', 'science', 'ethics', 'interview', 'psychiatry', 'neurology', 'endocrine', 'ddx', 'sex1', 'sex2', 'sexrel', 'sextr', 'sexcons', 'sexmed', 'sexint', 'sexddx', 'sexcase', 'cbtsex', 'hypsex', 'trsex', 'pfcsex'],
  [ADD]: ['psyphys', 'science', 'ethics', 'interview', 'psychiatry', 'neurology', 'endocrine', 'ddx', 'add1', 'addtypes', 'add6', 'add8', 'add9', 'addint', 'addddx', 'addcase', 'cbtadd', 'hypadd', 'tradd', 'pfcadd'],
  [PSYED]: ['psychoed'],
  [MCT1]: ['mct'],
  [MCT2]: ['mct2'],
  'Профессиональное сообщество': ['club'],
};

export const programColors = {
  [PSY1]: C.core, [PSY2]: C.core, [CBT]: C.pt, [HYP]: '#a78bfa', [TR]: '#d8b4fe',
  [PFC]: C.pfc, [STRESS]: C.stress, [SEX]: C.sex, [ADD]: C.add,
  [PSYED]: '#94a3b8', [MCT1]: '#64748b', [MCT2]: '#64748b', 'Профессиональное сообщество': C.club,
};

// Кластеры = области базовой матрицы; ПФК — отдельный блок
export const bubbles = [
  { name: 'КЛИНИЧЕСКИЕ АСПЕКТЫ', x: 0, y: 210, z: 0, r: 265, color: C.core, programs: [PSY1, PSY2] },
  { name: 'ПСИХОТЕРАПИЯ', x: -660, y: 300, z: 40, r: 285, color: C.pt, programs: [CBT, HYP, TR] },
  { name: 'ПФК', x: 660, y: 320, z: 40, r: 285, color: C.pfc, programs: [PFC] },
  { name: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ', x: 0, y: 420, z: 860, r: 310, color: C.stress, programs: [STRESS] },
  { name: 'СЕКСОЛОГИЯ', x: 0, y: 420, z: -860, r: 310, color: C.sex, programs: [SEX] },
  { name: 'АДДИКТОЛОГИЯ', x: 0, y: -560, z: 120, r: 330, color: C.add, programs: [ADD] },
  { name: PSY_CLUSTER, x: 220, y: -220, z: -700, r: 260, color: '#94a3b8', programs: [PSYED, MCT1, MCT2] },
];

export const programToBubble = {
  [PSY1]: 'КЛИНИЧЕСКИЕ АСПЕКТЫ',
  [PSY2]: 'КЛИНИЧЕСКИЕ АСПЕКТЫ',
  [CBT]: 'ПСИХОТЕРАПИЯ',
  [HYP]: 'ПСИХОТЕРАПИЯ',
  [TR]: 'ПСИХОТЕРАПИЯ',
  [PFC]: 'ПФК',
  [STRESS]: 'ПОСЛЕДСТВИЯ СТРЕССА И ПСИХОТРАВМЫ',
  [SEX]: 'СЕКСОЛОГИЯ',
  [ADD]: 'АДДИКТОЛОГИЯ',
  [PSYED]: PSY_CLUSTER,
  [MCT1]: PSY_CLUSTER,
  [MCT2]: PSY_CLUSTER,
  'Профессиональное сообщество': null,
};