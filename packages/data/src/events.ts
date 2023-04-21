export const EVENTS = [
  "40m",
  "60m",
  "100m",
  "200m",
  "300m",
  "400m",
  "800m",
  "1000m",
  "1500m",
  "2000m",
  "3000m",
  "5000m",
  "10000m",
  "Puolimaraton",
  "Maraton",
  "1500m estejuoksu",
  "3000m estejuoksu",
  "60m aitajuoksu",
  "80m aitajuoksu",
  "100m aitajuoksu",
  "110m aitajuoksu",
  "200m aitajuoksu",
  "300m aitajuoksu",
  "400m aitajuoksu",
  "Korkeus",
  "Seiväs",
  "Pituus",
  "Kolmiloikka",
  "Kuula",
  "Kiekko",
  "Moukari",
  "Keihäs",
  "Kolmiottelu",
  "Neliottelu",
  "Viisiottelu",
  "Seitsenottelu",
  "Kymmenottelu",
  "600m kävely",
  "1000m kävely",
  "2000m kävely",
  "3000m kävely",
  "10km kävely",
  "20km kävely",
  "50km kävely",
] as const;

export type RecordEvent = (typeof EVENTS)[number];
