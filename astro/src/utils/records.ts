import type { Record } from '@prisma/client';

export const formattedRecordAchievedDate = (record: Record) => {
  const achievedAt = record.achievedAt;
  const isFirstDateOfYear =
    achievedAt.getMonth() === 0 && achievedAt.getDate() === 1;
  return achievedAt.toLocaleDateString('fi', {
    year: 'numeric',
    month: isFirstDateOfYear ? undefined : '2-digit',
    day: isFirstDateOfYear ? undefined : '2-digit',
  });
};
