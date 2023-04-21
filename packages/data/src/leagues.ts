export const LEAGUES = [
  "Miehet",
  "Naiset",
  "Pojat 9",
  "Pojat 10",
  "Pojat 11",
  "Pojat 12",
  "Pojat 13",
  "Pojat 14",
  "Pojat 15",
  "Tytöt 9",
  "Tytöt 10",
  "Tytöt 11",
  "Tytöt 12",
  "Tytöt 13",
  "Tytöt 14",
  "Tytöt 15",
] as const;

export type League = (typeof LEAGUES)[number];
