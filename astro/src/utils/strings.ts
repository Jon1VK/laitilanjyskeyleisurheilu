import { titleize as t } from 'inflected';

const TITLEIZED_SLUGS = new Map([
  ['seuraennatykset', 'Seuraennätykset'],
  ['uusi-ennatys', 'Uusi Ennätys'],
  ['tytot-9', 'Tytöt 9'],
  ['tytot-10', 'Tytöt 10'],
  ['tytot-11', 'Tytöt 11'],
  ['tytot-12', 'Tytöt 12'],
  ['tytot-13', 'Tytöt 13'],
  ['tytot-14', 'Tytöt 14'],
  ['tytot-15', 'Tytöt 15'],
  ['seivas', 'Seiväs'],
  ['keihas', 'Keihäs'],
  ['600m-kavely', '600m kävely'],
  ['1000m-kavely', '1000m kävely'],
  ['2000m-kavely', '2000m kävely'],
  ['3000m-kavely', '3000m kävely'],
  ['10km-kavely', '10km kävely'],
  ['20km-kavely', '20km kävely'],
  ['50km-kavely', '50km kävely'],
]);

export const titleize = (string: string) =>
  TITLEIZED_SLUGS.has(string) ? <string>TITLEIZED_SLUGS.get(string) : t(string);
