import prisma from '@lib/prisma';
import type { Record } from '@prisma/client';
import { EVENTS_BY_LEAGUE, League } from '@utils/records';

const PrismaRecord = Object.assign(prisma.record, {
  async findClubRecordsByLeagueAndMappedByEvent(league: League) {
    const records = await prisma.$queryRaw<Record[]>`
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
    const recordsByEvent = new Map<string, Record[]>();
    EVENTS_BY_LEAGUE[league].forEach((event) => {
      const eventRecords = records.filter((record) => record.event === event);
      recordsByEvent.set(event, eventRecords);
    });
    return recordsByEvent;
  },
  async findTopTenByLeagueAndEvent(league: League, event: string) {
    return await prisma.$queryRaw<Record[]>`
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
});

export default PrismaRecord;
