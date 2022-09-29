import { PrismaRecurringEvent } from '@models';
import type { Event } from '@prisma/client';
import { getDatesBetween } from '@utils/dates';
import { parameterize } from 'inflected';
import { z } from 'zod';

const input = z.object({
  type: z.enum(['PRACTICE', 'COMPETITION', 'OTHER']),
  weekdays: z.array(z.number().min(0).max(6)).min(1),
  recurrenceStartDate: z.date(),
  recurrenceEndDate: z.date(),
  startTime: z.string(),
  endTime: z.string().nullable().optional(),
  title: z.string().min(1),
  location: z.string().min(1).nullable(),
  description: z.string().min(1).nullable(),
  pressStartBefore: z.number().min(7).max(21),
  pressEndBefore: z.number().min(1).max(14),
  pressBody: z.string().min(1).nullable(),
});

type Input = z.infer<typeof input>;

type Occurrence = Omit<
  Event,
  | 'id'
  | 'recurringEventId'
  | 'resultsFileKey'
  | 'timetableFileKey'
  | 'externalUrl'
  | 'promote'
>;

const resolve = async ({ input }: { input: Input }) => {
  const {
    weekdays,
    recurrenceStartDate,
    recurrenceEndDate,
    startTime,
    endTime,
    title,
    pressStartBefore,
    pressEndBefore,
    ...occurrenceData
  } = input;
  const titleSlug = parameterize(title);
  const occurrences = getDatesBetween(recurrenceStartDate, recurrenceEndDate)
    .filter((date) => weekdays.includes(date.getDay()))
    .map<Occurrence>((date) => {
      const dateString = date.toLocaleDateString('sv');
      return {
        ...occurrenceData,
        slug: `${dateString}-${titleSlug}`,
        startDateTime: new Date(`${dateString} ${startTime}`),
        endDateTime: endTime ? new Date(`${dateString} ${endTime}`) : null,
        title,
        pressStartDate: new Date(
          date.getTime() - pressStartBefore * 24 * 60 * 60 * 1000
        ),
        pressEndDate: new Date(
          date.getTime() - pressEndBefore * 24 * 60 * 60 * 1000
        ),
      };
    });
  await PrismaRecurringEvent.create({
    data: {
      startDate: recurrenceStartDate,
      endDate: recurrenceEndDate,
      weekdays,
      occurrences: {
        createMany: {
          data: occurrences,
        },
      },
    },
  });
};

const createRecurringEvent = { input, resolve };

export default createRecurringEvent;
