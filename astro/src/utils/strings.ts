import { titleize as t } from 'inflected';

const TITLEIZED_SLUGS = new Map([
  ['seuraennatykset', 'Seuraennätykset'],
  ['uusi-ennatys', 'Uusi Ennätys'],
]);

export const titleize = (string: string) =>
  TITLEIZED_SLUGS.has(string) ? TITLEIZED_SLUGS.get(string) : t(string);
