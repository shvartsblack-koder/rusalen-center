// ============================================================
// Адаптер каталога над единым источником данных educationModel.
// Все фактические параметры программ (название, часы, статус,
// цена, документ) живут ТОЛЬКО в educationModel — этот файл
// лишь переводит их в форму, которую читают фильтры и карточки.
// ============================================================
import { publicPrograms, PROGRAM_STATUSES } from '@/components/education/educationModel';

export const MAX_HOURS = 600;

export const DOC_TYPE_LABELS = {
  qualification: 'Повышение квалификации',
  retraining: 'Профпереподготовка',
};

export const PROGRAMS = publicPrograms().map((p) => ({
  id: p.id,
  status: p.status,
  statusLabel: PROGRAM_STATUSES[p.status].label,
  title: p.title,
  shortTitle: p.shortTitle || p.title,
  note: p.note || null,
  subtitle: p.subtitle || null,
  description: p.description || '',
  audience: p.audience || '',
  accents: p.accents || '',
  extra: p.extra || null,
  hours: p.hours ?? null,
  format: p.format,
  document: p.document || null,
  docTypes: p.format === 'ПК' ? ['qualification'] : p.format === 'ПП' ? ['retraining'] : [],
  hasCertificate: p.format ? true : null,
  price: p.pricing ?? null,
  path: p.path || null,
}));