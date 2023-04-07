import type { Event } from "@prisma/client";
import { PrismaEvent } from "@server/models";
import type { APIRoute } from "astro";
import { prisma } from "~/server/db/prisma";
import { formattedDateTimePeriod } from "~/utils/dates";

export const post: APIRoute = async ({ request }) => {
  if (request.headers.get("Authorization") !== import.meta.env.API_SECRET) {
    return new Response(null, { status: 401 });
  }
  const body = (await request.json()) as Record<string, string>;
  const sendDate = new Date(body.sendDate);
  const events = await PrismaEvent.findByPressSendDate(sendDate);
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
        formattedDateTimePeriod(event, "short") +
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
        `${formattedDateTimePeriod(event, "short")}\n` +
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
