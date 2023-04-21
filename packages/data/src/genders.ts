export const GENDERS = ["Aikuiset", "Pojat", "Tytöt"] as const;

export type Gender = (typeof GENDERS)[number];
