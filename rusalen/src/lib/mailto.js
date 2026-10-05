export const DPO_EMAIL = 'ceo@rusalencenter.ru';

export function mailtoHref(subject) {
  return `mailto:${DPO_EMAIL}?subject=${encodeURIComponent(subject)}`;
}