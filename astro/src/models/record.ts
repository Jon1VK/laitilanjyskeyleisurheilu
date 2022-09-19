import prisma from '@lib/prisma';
import type { Record as IRecord } from '@prisma/client';

const PrismaRecord = Object.assign(prisma.record, {
  async findClubRecordsByLeagueAndMappedByEvent(league: LEAGUE) {
    const records = await prisma.$queryRaw<IRecord[]>`
      SELECT *
      FROM "Record" as R1
        JOIN (
          SELECT event,
            CASE
              WHEN event SIMILAR TO '[0-9]%|Puoli%|Maraton%' THEN MIN(LPAD(result, 10, '0'))
              ELSE MAX(LPAD(result, 10, '0'))
            END AS "bestResult"
          FROM "Record"
          WHERE league = ${league}
            AND reviewed
          GROUP BY event
        ) AS R2 ON R1.event = R2.event
      WHERE league = ${league}
        AND reviewed
        AND LPAD(R1.result, 10, '0') = R2."bestResult"
      ORDER BY "achievedAt"
    `;
    const recordsByEvent = new Map<string, IRecord[]>();
    EVENTS_BY_LEAGUE[league].forEach((event) => {
      const eventRecords = records.filter((record) => record.event === event);
      recordsByEvent.set(event, eventRecords);
    });
    return recordsByEvent;
  },
  async findTopTenByLeagueAndEvent(league: LEAGUE, event: string) {
    return await prisma.$queryRaw<IRecord[]>`
      SELECT *
      FROM "Record" as R1
        JOIN (
          SELECT athlete,
            CASE
              WHEN event SIMILAR TO '[0-9]%|Puoli%|Maraton%' THEN MIN(LPAD(result, 10, '0'))
              ELSE MAX(LPAD(result, 10, '0'))
            END AS "bestResult"
          FROM "Record"
          WHERE league = ${league}
            AND event = ${event}
            AND reviewed
          GROUP BY athlete,
            event
        ) AS R2 ON R1.athlete = R2.athlete
      WHERE league = ${league}
        AND event = ${event}
        AND reviewed
        AND LPAD(R1.result, 10, '0') = R2."bestResult"
      ORDER BY CASE
          WHEN event SIMILAR TO '[0-9]%|Puoli%|Maraton' THEN LPAD(result, 10, '0')
        END ASC,
        LPAD(result, 10, '0') DESC,
        "achievedAt" ASC
      LIMIT 10
    `;
  },
  getGenders() {
    return GENDERS;
  },
  getLeaguesByGender(gender: GENDER) {
    return LEAGUES_BY_GENDER[gender];
  },
  getEventsByLeague(league: LEAGUE) {
    return EVENTS_BY_LEAGUE[league];
  },
});

export type GENDER = 'Aikuiset' | 'Pojat' | 'Tytöt';

const GENDERS: GENDER[] = ['Aikuiset', 'Pojat', 'Tytöt'];

const LEAGUES_BY_GENDER: Record<GENDER, string[]> = {
  Aikuiset: ['Miehet', 'Naiset'],
  Pojat: [
    'Pojat 9',
    'Pojat 10',
    'Pojat 11',
    'Pojat 12',
    'Pojat 13',
    'Pojat 14',
    'Pojat 15',
  ],
  Tytöt: [
    'Tytöt 9',
    'Tytöt 10',
    'Tytöt 11',
    'Tytöt 12',
    'Tytöt 13',
    'Tytöt 14',
    'Tytöt 15',
  ],
};

const EVENTS_BY_LEAGUE = {
  'Pojat 9': [
    '40m',
    '1000m',
    'Korkeus',
    'Pituus',
    'Kuula',
    'Kiekko',
    'Moukari',
    'Keihäs',
    'Kolmiottelu',
    'Neliottelu',
    '600m kävely',
  ],
  'Pojat 10': [
    '60m',
    '1000m',
    '60m aitajuoksu',
    'Korkeus',
    'Seiväs',
    'Pituus',
    'Kolmiloikka',
    'Kuula',
    'Kiekko',
    'Moukari',
    'Keihäs',
    'Kolmiottelu',
    'Neliottelu',
    '1000m kävely',
  ],
  'Pojat 11': [
    '60m',
    '1000m',
    '60m aitajuoksu',
    'Korkeus',
    'Seiväs',
    'Pituus',
    'Kolmiloikka',
    'Kuula',
    'Kiekko',
    'Moukari',
    'Keihäs',
    'Kolmiottelu',
    'Neliottelu',
    '1000m kävely',
  ],
  'Pojat 12': [
    '60m',
    '200m',
    '1000m',
    '60m aitajuoksu',
    '200m aitajuoksu',
    'Korkeus',
    'Seiväs',
    'Pituus',
    'Kolmiloikka',
    'Kuula',
    'Kiekko',
    'Moukari',
    'Keihäs',
    'Neliottelu',
    'Viisiottelu',
    '2000m kävely',
  ],
  'Pojat 13': [
    '60m',
    '200m',
    '1000m',
    '60m aitajuoksu',
    '200m aitajuoksu',
    'Korkeus',
    'Seiväs',
    'Pituus',
    'Kolmiloikka',
    'Kuula',
    'Kiekko',
    'Moukari',
    'Keihäs',
    'Neliottelu',
    'Viisiottelu',
    '2000m kävely',
  ],
  'Pojat 14': [
    '100m',
    '300m',
    '800m',
    '2000m',
    '1500m estejuoksu',
    '100m aitajuoksu',
    '300m aitajuoksu',
    'Korkeus',
    'Seiväs',
    'Pituus',
    'Kolmiloikka',
    'Kuula',
    'Kiekko',
    'Moukari',
    'Keihäs',
    'Viisiottelu',
    '3000m kävely',
  ],
  'Pojat 15': [
    '100m',
    '300m',
    '800m',
    '2000m',
    '1500m estejuoksu',
    '100m aitajuoksu',
    '300m aitajuoksu',
    'Korkeus',
    'Seiväs',
    'Pituus',
    'Kolmiloikka',
    'Kuula',
    'Kiekko',
    'Moukari',
    'Keihäs',
    'Viisiottelu',
    '3000m kävely',
  ],
  'Tytöt 9': [
    '40m',
    '1000m',
    'Korkeus',
    'Pituus',
    'Kuula',
    'Kiekko',
    'Moukari',
    'Keihäs',
    'Kolmiottelu',
    'Neliottelu',
    '600m kävely',
  ],
  'Tytöt 10': [
    '60m',
    '1000m',
    '60m aitajuoksu',
    'Korkeus',
    'Seiväs',
    'Pituus',
    'Kolmiloikka',
    'Kuula',
    'Kiekko',
    'Moukari',
    'Keihäs',
    'Kolmiottelu',
    'Neliottelu',
    '1000m kävely',
  ],
  'Tytöt 11': [
    '60m',
    '1000m',
    '60m aitajuoksu',
    'Korkeus',
    'Seiväs',
    'Pituus',
    'Kolmiloikka',
    'Kuula',
    'Kiekko',
    'Moukari',
    'Keihäs',
    'Kolmiottelu',
    'Neliottelu',
    '1000m kävely',
  ],
  'Tytöt 12': [
    '60m',
    '200m',
    '1000m',
    '60m aitajuoksu',
    '200m aitajuoksu',
    'Korkeus',
    'Seiväs',
    'Pituus',
    'Kolmiloikka',
    'Kuula',
    'Kiekko',
    'Moukari',
    'Keihäs',
    'Neliottelu',
    'Viisiottelu',
    '2000m kävely',
  ],
  'Tytöt 13': [
    '60m',
    '200m',
    '1000m',
    '60m aitajuoksu',
    '200m aitajuoksu',
    'Korkeus',
    'Seiväs',
    'Pituus',
    'Kolmiloikka',
    'Kuula',
    'Kiekko',
    'Moukari',
    'Keihäs',
    'Neliottelu',
    'Viisiottelu',
    '2000m kävely',
  ],
  'Tytöt 14': [
    '100m',
    '300m',
    '800m',
    '2000m',
    '1500m estejuoksu',
    '80m aitajuoksu',
    '300m aitajuoksu',
    'Korkeus',
    'Seiväs',
    'Pituus',
    'Kolmiloikka',
    'Kuula',
    'Kiekko',
    'Moukari',
    'Keihäs',
    'Viisiottelu',
    '3000m kävely',
  ],
  'Tytöt 15': [
    '100m',
    '300m',
    '800m',
    '2000m',
    '1500m estejuoksu',
    '80m aitajuoksu',
    '300m aitajuoksu',
    'Korkeus',
    'Seiväs',
    'Pituus',
    'Kolmiloikka',
    'Kuula',
    'Kiekko',
    'Moukari',
    'Keihäs',
    'Viisiottelu',
    '3000m kävely',
  ],
  Miehet: [
    '100m',
    '200m',
    '400m',
    '800m',
    '1500m',
    '3000m',
    '5000m',
    '10000m',
    'Puolimaraton',
    'Maraton',
    '3000m estejuoksu',
    '110m aitajuoksu',
    '400m aitajuoksu',
    'Korkeus',
    'Seiväs',
    'Pituus',
    'Kolmiloikka',
    'Kuula',
    'Kiekko',
    'Moukari',
    'Keihäs',
    'Kymmenottelu',
    '20km kävely',
    '50km kävely',
  ],
  Naiset: [
    '100m',
    '200m',
    '400m',
    '800m',
    '1500m',
    '3000m',
    '5000m',
    '10000m',
    'Puolimaraton',
    'Maraton',
    '3000m estejuoksu',
    '100m aitajuoksu',
    '400m aitajuoksu',
    'Korkeus',
    'Seiväs',
    'Pituus',
    'Kolmiloikka',
    'Kuula',
    'Kiekko',
    'Moukari',
    'Keihäs',
    'Seitsenottelu',
    '10km kävely',
    '20km kävely',
  ],
};

export type LEAGUE = keyof typeof EVENTS_BY_LEAGUE;

export default PrismaRecord;
