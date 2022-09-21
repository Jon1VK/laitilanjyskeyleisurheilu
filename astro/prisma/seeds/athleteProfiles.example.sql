COPY public."AthleteProfile" (id, slug, avatar, "heroImage", "mainEvents", description, "userId") FROM stdin;
1	joni-vainio-kaila	\N	\N	400m aitajuoksu	\N	1
\.

SELECT pg_catalog.setval('public."AthleteProfile_id_seq"', 1, true);
