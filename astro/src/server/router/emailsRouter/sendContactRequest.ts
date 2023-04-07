import type { MailDataRequired } from "@sendgrid/mail";
import { sendgridClient } from "@server/services/sendgridClient";
import { z } from "zod";
import type { RouterInput } from "..";
import { publicProcedure } from "../trpc";

export const sendContactRequestEmail = publicProcedure
  .input(
    z.object({
      firstname: z.string().min(1),
      lastname: z.string().min(1),
      email: z.string().min(1),
      phone: z.string().min(1).optional(),
      subject: z.string().min(1),
      message: z.string().min(1),
    })
  )
  .mutation(async ({ input }) => {
    const contactEmail: MailDataRequired = {
      to: import.meta.env.CONTACT_EMAIL_RECIPIENTS.split(" "),
      from: "no-reply@laitilanjyskeyleisurheilu.fi",
      subject: "Uusi viesti osoitteesta laitilanjyskeyleisurheilu.fi",
      text: contactText(input),
      mailSettings: {
        sandboxMode: {
          enable: import.meta.env.DEV,
        },
      },
    };
    const responseEmail: MailDataRequired = {
      to: input.email,
      from: "no-reply@laitilanjyskeyleisurheilu.fi",
      subject: "Viestisi on vastaanotettu",
      text: responseText(input),
      mailSettings: {
        sandboxMode: {
          enable: import.meta.env.DEV,
        },
      },
    };
    await sendgridClient.send([contactEmail, responseEmail]);
  });

type Input = RouterInput["email"]["sendContactRequest"];

const contactText = (input: Input) => {
  const { firstname, lastname, email, phone, subject, message } = input;
  return `${subject}

${message}

Viestin lähettäjä:

${firstname} ${lastname}
${email}
${phone || ""}`;
};

const responseText = (input: Input) => {
  const { firstname, lastname, subject, message } = input;
  return `Hei ${firstname} ${lastname}!

Vastaamme lähettämääsi viestiin mahdollisimman pian.

Lähettämäsi viesti:
--------------------------------------
${subject}

${message}
--------------------------------------

Ystävällisin terveisin

Laitilan Jyske - Yleisurheilujaosto`;
};
