COPY public."User" (id, email, name, "isAdmin", "isAthlete") FROM stdin;
1	jonivainiokaila@gmail.com	Joni Vainio-Kaila	t	t
\.

SELECT pg_catalog.setval('public."User_id_seq"', 1, true);
