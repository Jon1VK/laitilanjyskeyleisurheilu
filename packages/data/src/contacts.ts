interface ContactData {
  title?: string;
  name: string;
  email: string;
  phone: string;
}

export const contacts = [
  {
    title: "Puheenjohtaja",
    name: "Pekka Kuusisto",
    email: "pekka.kuusisto@lahitapiola.fi",
    phone: "040 744 3663",
  },
  {
    title: "Varapuheenjohtaja",
    name: "Riikka Matikainen",
    email: "matikainen.riikka@gmail.com",
    phone: "044 591 3019",
  },
  {
    title: "Sihteeri",
    name: "Marja Heikkilä",
    email: "marjaheikkila25@gmail.com",
    phone: "040 084 4070",
  },
  {
    title: "Nuorisopäällikkö",
    name: "Mia Grönroos",
    email: "gronroos.mia@gmail.com",
    phone: "040 595 9519",
  },
  {
    title: "Valmennuspäällikkö",
    name: "Evastina Hurme-Vuorela",
    email: "vuorela@lailanet.fi",
    phone: "044 786 5801",
  },
  {
    name: "Rami Hyytiä",
    email: "rami.hyytia@lailanet.fi",
    phone: "040 099 9636",
  },
  {
    name: "Unto Kokkala",
    email: "unto.kokkala@lailanet.fi",
    phone: "040 520 9975",
  },
  {
    name: "Hannele Lahtonen",
    email: "hannele.lahtonen@gmail.com",
    phone: "045 859 8832",
  },
  {
    name: "Ilkka Simola",
    email: "ilkkak.simola@gmail.com",
    phone: "044 986 6800",
  },
  {
    name: "Joni Vainio-Kaila",
    email: "jonivainiokaila@gmail.com",
    phone: "040 056 1167",
  },
  {
    name: "Ilmari Vuorela",
    email: "ilmari55@icloud.com",
    phone: "044 317 6304",
  },
] satisfies ContactData[];

export default contacts;
