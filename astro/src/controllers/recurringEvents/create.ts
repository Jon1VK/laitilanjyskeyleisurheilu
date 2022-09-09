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
  endTime: z.string().nullable(),
  title: z.string().min(1),
  location: z.string().min(1).nullable(),
  description: z.string().min(1).nullable(),
});

type Input = z.infer<typeof input>;

const resolve = async ({
  input: {
    type,
    weekdays,
    recurrenceStartDate,
    recurrenceEndDate,
    startTime,
    endTime,
    title,
    location,
    description,
  },
}: {
  input: Input;
}) => {
  const titleSlug = parameterize(title);
  const occurrences = getDatesBetween(recurrenceStartDate, recurrenceEndDate)
    .filter((date) => weekdays.includes(date.getDay()))
    .map<Omit<Event, 'id' | 'recurringEventId'>>((date) => {
      const dateString = date.toLocaleDateString('sv');
      return {
        type,
        slug: `${dateString}-${titleSlug}`,
        startDateTime: new Date(`${dateString} ${startTime}`),
        endDateTime: endTime ? new Date(`${dateString} ${endTime}`) : null,
        title,
        location,
        description,
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
