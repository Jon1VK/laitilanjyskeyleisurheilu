import type { MailDataRequired } from "@sendgrid/mail";
import { callMeBotClient } from "@server/services/callMeBotClient";
import { sendgridClient } from "@server/services/sendgridClient";
import type { APIRoute } from "astro";
import { prisma } from "~/server/db/prisma";

export const post: APIRoute = async ({ request }) => {
  if (request.headers.get("Authorization") !== import.meta.env.API_SECRET) {
    return new Response(null, { status: 401 });
  }
  const currentDateString = new Date().toLocaleDateString("sv");
  const sendDate = new Date(currentDateString);
  const pressRelease = await prisma.pressRelease.findUnique({
    where: { sendDate },
  });
  if (!pressRelease) {
    return new Response(
      JSON.stringify({
        message: `There was no press release for date ${currentDateString}`,
      }),
      { status: 200 }
    );
  }
  const messages = pressRelease.whatsappBody.split(
    "\n-------------------------\n"
  );
  for (const message of messages) {
    await callMeBotClient.sendWhatsAppMessage(message);
  }
  const pressEmail: MailDataRequired = {
    to: import.meta.env.PRESS_EMAIL_RECIPIENTS.split(" "),
    from: "no-reply@laitilanjyskeyleisurheilu.fi",
    subject: "Yleisurheilutiedotteet",
    text: pressRelease.newsBody,
    mailSettings: {
      sandboxMode: {
        enable: import.meta.env.DEV,
      },
    },
  };
  await sendgridClient.send([pressEmail]);
  await prisma.pressRelease.delete({ where: { sendDate } });
  return new Response(
    JSON.stringify({
      message: `Press release was sent successfully for date ${currentDateString}`,
    }),
    { status: 200 }
  );
};
