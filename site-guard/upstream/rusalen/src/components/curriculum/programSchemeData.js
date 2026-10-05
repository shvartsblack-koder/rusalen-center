// ============================================================
// 2D-сборка программ РУСАЛЕН — раскладка и связи.
//
// Факты программ (название, часы, формат, цель) читаются из
// базовой матрицы (dpo/matrixData), синхронизированной с
// educationModel. Здесь — только позиции карточек, зоны и связи.
// Клиническая база — реальные ступени «Психиатрии для психологов»
// I (96 ч) + II (144 ч), полный маршрут 240 ч.
// ============================================================

import { PROGRAMS } from '@/components/dpo/matrixData';

// Позиции карточек на схеме (координаты левого верхнего угла).
const LAYOUT = {
  psy1: { x: 55, y: 250 },
  psy2: { x: 55, y: 340 },
  cbt: { x: 340, y: 85 },
  hypnosis: { x: 340, y: 200 },
  transpersonal: { x: 555, y: 85 },
  pfc: { x: 555, y: 200 },
  'stress-trauma': { x: 870, y: 105 },
  sexology: { x: 870, y: 265 },
  addictology: { x: 870, y: 425 },
  psychoed: { x: 340, y: 500 },
  'mct-borderline': { x: 555, y: 500 },
  'mct-major': { x: 555, y: 588 },
  orgbiz: { x: 870, y: 555 },
};

export const schemePrograms = PROGRAMS.map((p) => ({
  id: p.id,
  name: p.name,
  short: p.short,
  format: p.formatCode,
  hours: p.hours,
  goal: p.goal,
  x: LAYOUT[p.id].x,
  y: LAYOUT[p.id].y,
}));

export const schemeZones = [
  { title: 'КЛИНИЧЕСКАЯ БАЗА · ПК', x: 30, y: 230, w: 225, h: 205 },
  { title: 'МЕТОДЫ · ПСИХОТЕРАПИЯ + ПФК', x: 300, y: 40, w: 455, h: 315 },
  { title: 'ПРОГРАММЫ ДЛЯ ВНЕДРЕНИЯ В КЛИНИКО-ПСИХОЛОГИЧЕСКУЮ РАБОТУ В ПСИХИАТРИИ', x: 300, y: 455, w: 455, h: 210 },
  { title: 'ПРЕДМЕТНЫЕ ПРОФЕССИОНАЛЬНЫЕ ПЕРЕПОДГОТОВКИ', x: 825, y: 65, w: 360, h: 570 },
];

export const schemeRelationTypes = {
  sequence: { color: '#eaf2ff', label: 'последовательность ступеней I → II' },
  base_credit: { color: '#57d6a2', label: 'клиническая база · полный перезачёт' },
  partial_credit: { color: '#7c91ad', label: 'частичный перезачёт' },
  application: { color: '#b885ff', label: 'метод → профильное применение' },
  shared_content: { color: '#50d4e8', label: 'общий учебный блок' },
};

// Связи перезачёта ведут от ступеней «Психиатрии для психологов»:
// полный перезачёт клинической базы — от обеих ступеней,
// общие блоки с методами — от базовой ступени I.
export const schemeRelations = [
  { from: 'psy1', to: 'psy2', type: 'sequence', label: 'Ступень II продолжает маршрут ступени I: 96 + 144 = 240 ч полного маршрута' },
  { from: 'psy1', to: 'stress-trauma', type: 'base_credit', label: 'Клиническая база (ступени психиатрии) встроена в ПП и перезачитывается целиком при подтверждённом освоении' },
  { from: 'psy1', to: 'sexology', type: 'base_credit', label: 'Клиническая база (ступени психиатрии) встроена в ПП и перезачитывается целиком при подтверждённом освоении' },
  { from: 'psy1', to: 'addictology', type: 'base_credit', label: 'Клиническая база (ступени психиатрии) встроена в ПП и перезачитывается целиком при подтверждённом освоении' },
  { from: 'psy2', to: 'stress-trauma', type: 'base_credit', label: 'Клиническая база (ступени психиатрии) встроена в ПП и перезачитывается целиком при подтверждённом освоении' },
  { from: 'psy2', to: 'sexology', type: 'base_credit', label: 'Клиническая база (ступени психиатрии) встроена в ПП и перезачитывается целиком при подтверждённом освоении' },
  { from: 'psy2', to: 'addictology', type: 'base_credit', label: 'Клиническая база (ступени психиатрии) встроена в ПП и перезачитывается целиком при подтверждённом освоении' },
  { from: 'psy1', to: 'cbt', type: 'partial_credit', label: 'Общие блоки могут быть перезачтены' },
  { from: 'psy1', to: 'hypnosis', type: 'partial_credit', label: 'Общие блоки могут быть перезачтены' },
  { from: 'psy1', to: 'transpersonal', type: 'partial_credit', label: 'Общие блоки могут быть перезачтены' },
  { from: 'psy1', to: 'pfc', type: 'partial_credit', label: 'Общие блоки могут быть перезачтены' },
  { from: 'cbt', to: 'stress-trauma', type: 'application', label: 'КПТ → применение при последствиях стресса и психотравмы' },
  { from: 'cbt', to: 'sexology', type: 'application', label: 'КПТ → применение в сексологии' },
  { from: 'cbt', to: 'addictology', type: 'application', label: 'КПТ → применение в аддиктологии' },
  { from: 'hypnosis', to: 'stress-trauma', type: 'application', label: 'Гипноз → применение при последствиях стресса и психотравмы' },
  { from: 'hypnosis', to: 'sexology', type: 'application', label: 'Гипноз → применение в сексологии' },
  { from: 'hypnosis', to: 'addictology', type: 'application', label: 'Гипноз → применение в аддиктологии' },
  { from: 'transpersonal', to: 'stress-trauma', type: 'application', label: 'Трансперсональная психотерапия → применение при последствиях стресса и психотравмы' },
  { from: 'transpersonal', to: 'sexology', type: 'application', label: 'Трансперсональная психотерапия → применение в сексологии' },
  { from: 'transpersonal', to: 'addictology', type: 'application', label: 'Трансперсональная психотерапия → применение в аддиктологии' },
  { from: 'pfc', to: 'stress-trauma', type: 'application', label: 'ПФК → применение при стрессовой дизрегуляции' },
  { from: 'pfc', to: 'sexology', type: 'application', label: 'ПФК → применение в сексологии' },
  { from: 'pfc', to: 'addictology', type: 'application', label: 'ПФК → применение в аддиктологии' },
  { from: 'transpersonal', to: 'pfc', type: 'shared_content', label: 'Общий учебный блок «Дыхательные практики»' },
  { from: 'hypnosis', to: 'pfc', type: 'shared_content', label: 'Общий базовый модуль «Основы гипноза»' },
];