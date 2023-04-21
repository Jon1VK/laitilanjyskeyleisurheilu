import type { Event } from "@laitjy/db";
import { prisma } from "@laitjy/db";
import { dateUtils } from "@laitjy/utils";
import type { APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
  if (request.headers.get("Authorization") !== import.meta.env.API_SECRET) {
    return new Response(null, { status: 401 });
  }
  const body = (await request.json()) as Record<string, string>;
  const sendDate = new Date(body["sendDate"] as string);
  const events = await prisma.event.findMany({
    where: {
      pressStartDate: { lte: sendDate },
      pressEndDate: { gte: sendDate },
    },
    orderBy: { startDateTime: "asc" },
  });
  await prisma.pressRelease.create({
    data: {
      sendDate,
      newsBody: createNewsBody(events),
      whatsappBody: createWhatsappBody(events),
    },
  });
  return new Response(
    JSON.stringify({
      message: `Press release created for date ${sendDate.toLocaleDateString(
        "sv"
      )}`,
    }),
    { status: 200 }
  );
};

export const createNewsBody = (events: Event[]) => {
  const eventsString = events
    .map(
      (event) =>
        `${event.title}\n` +
        dateUtils.formattedDateTimePeriod(event, "short") +
        (event.location ? ` ${event.location}\n` : "\n") +
        (event.pressBody ? `${event.pressBody}\n` : "")
    )
    .join("\n");
  return (
    "Alla yleisurheilutiedotteet seuraavaan lehteen\n" +
    "\n" +
    "-------------------------\n" +
    eventsString +
    "-------------------------\n" +
    "\n" +
    "Terveisin\n" +
    "Laitilan Jyske - Yleisurheilujaosto"
  );
};

const createWhatsappBody = (events: Event[]) => {
  const eventsString = events
    .map(
      (event) =>
        `*${event.title}*\n` +
        `${dateUtils.formattedDateTimePeriod(event, "short")}\n` +
        (event.location ? `${event.location}\n` : "") +
        (event.pressBody ? `\n${event.pressBody}\n` : "")
    )
    .join("-------------------------\n");
  return (
    "*Tulevat tapahtumat*\n" +
    "-------------------------\n" +
    eventsString +
    "-------------------------\n" +
    "Kaikki tulevat tapahtumat löydät osoitteesta laitilanjyskeyleisurheilu.fi/tapahtumat"
  );
};
