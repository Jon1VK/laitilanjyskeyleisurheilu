import type { RecordEvent } from "./events";
import type { League } from "./leagues";

export const EVENTS_BY_LEAGUE = {
  "Pojat 9": [
    "40m",
    "1000m",
    "Korkeus",
    "Pituus",
    "Kuula",
    "Kiekko",
    "Moukari",
    "Keihäs",
    "Kolmiottelu",
    "Neliottelu",
    "600m kävely",
  ],
  "Pojat 10": [
    "60m",
    "1000m",
    "60m aitajuoksu",
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
    "1000m kävely",
  ],
  "Pojat 11": [
    "60m",
    "1000m",
    "60m aitajuoksu",
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
    "1000m kävely",
  ],
  "Pojat 12": [
    "60m",
    "200m",
    "1000m",
    "60m aitajuoksu",
    "200m aitajuoksu",
    "Korkeus",
    "Seiväs",
    "Pituus",
    "Kolmiloikka",
    "Kuula",
    "Kiekko",
    "Moukari",
    "Keihäs",
    "Neliottelu",
    "Viisiottelu",
    "2000m kävely",
  ],
  "Pojat 13": [
    "60m",
    "200m",
    "1000m",
    "60m aitajuoksu",
    "200m aitajuoksu",
    "Korkeus",
    "Seiväs",
    "Pituus",
    "Kolmiloikka",
    "Kuula",
    "Kiekko",
    "Moukari",
    "Keihäs",
    "Neliottelu",
    "Viisiottelu",
    "2000m kävely",
  ],
  "Pojat 14": [
    "100m",
    "300m",
    "800m",
    "2000m",
    "1500m estejuoksu",
    "100m aitajuoksu",
    "300m aitajuoksu",
    "Korkeus",
    "Seiväs",
    "Pituus",
    "Kolmiloikka",
    "Kuula",
    "Kiekko",
    "Moukari",
    "Keihäs",
    "Viisiottelu",
    "3000m kävely",
  ],
  "Pojat 15": [
    "100m",
    "300m",
    "800m",
    "2000m",
    "1500m estejuoksu",
    "100m aitajuoksu",
    "300m aitajuoksu",
    "Korkeus",
    "Seiväs",
    "Pituus",
    "Kolmiloikka",
    "Kuula",
    "Kiekko",
    "Moukari",
    "Keihäs",
    "Viisiottelu",
    "3000m kävely",
  ],
  "Tytöt 9": [
    "40m",
    "1000m",
    "Korkeus",
    "Pituus",
    "Kuula",
    "Kiekko",
    "Moukari",
    "Keihäs",
    "Kolmiottelu",
    "Neliottelu",
    "600m kävely",
  ],
  "Tytöt 10": [
    "60m",
    "1000m",
    "60m aitajuoksu",
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
    "1000m kävely",
  ],
  "Tytöt 11": [
    "60m",
    "1000m",
    "60m aitajuoksu",
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
    "1000m kävely",
  ],
  "Tytöt 12": [
    "60m",
    "200m",
    "1000m",
    "60m aitajuoksu",
    "200m aitajuoksu",
    "Korkeus",
    "Seiväs",
    "Pituus",
    "Kolmiloikka",
    "Kuula",
    "Kiekko",
    "Moukari",
    "Keihäs",
    "Neliottelu",
    "Viisiottelu",
    "2000m kävely",
  ],
  "Tytöt 13": [
    "60m",
    "200m",
    "1000m",
    "60m aitajuoksu",
    "200m aitajuoksu",
    "Korkeus",
    "Seiväs",
    "Pituus",
    "Kolmiloikka",
    "Kuula",
    "Kiekko",
    "Moukari",
    "Keihäs",
    "Neliottelu",
    "Viisiottelu",
    "2000m kävely",
  ],
  "Tytöt 14": [
    "100m",
    "300m",
    "800m",
    "2000m",
    "1500m estejuoksu",
    "80m aitajuoksu",
    "300m aitajuoksu",
    "Korkeus",
    "Seiväs",
    "Pituus",
    "Kolmiloikka",
    "Kuula",
    "Kiekko",
    "Moukari",
    "Keihäs",
    "Viisiottelu",
    "3000m kävely",
  ],
  "Tytöt 15": [
    "100m",
    "300m",
    "800m",
    "2000m",
    "1500m estejuoksu",
    "80m aitajuoksu",
    "300m aitajuoksu",
    "Korkeus",
    "Seiväs",
    "Pituus",
    "Kolmiloikka",
    "Kuula",
    "Kiekko",
    "Moukari",
    "Keihäs",
    "Viisiottelu",
    "3000m kävely",
  ],
  Miehet: [
    "100m",
    "200m",
    "400m",
    "800m",
    "1500m",
    "3000m",
    "5000m",
    "10000m",
    "Puolimaraton",
    "Maraton",
    "3000m estejuoksu",
    "110m aitajuoksu",
    "400m aitajuoksu",
    "Korkeus",
    "Seiväs",
    "Pituus",
    "Kolmiloikka",
    "Kuula",
    "Kiekko",
    "Moukari",
    "Keihäs",
    "Kymmenottelu",
    "20km kävely",
    "50km kävely",
  ],
  Naiset: [
    "100m",
    "200m",
    "400m",
    "800m",
    "1500m",
    "3000m",
    "5000m",
    "10000m",
    "Puolimaraton",
    "Maraton",
    "3000m estejuoksu",
    "100m aitajuoksu",
    "400m aitajuoksu",
    "Korkeus",
    "Seiväs",
    "Pituus",
    "Kolmiloikka",
    "Kuula",
    "Kiekko",
    "Moukari",
    "Keihäs",
    "Seitsenottelu",
    "10km kävely",
    "20km kävely",
  ],
} satisfies Record<League, RecordEvent[]>;