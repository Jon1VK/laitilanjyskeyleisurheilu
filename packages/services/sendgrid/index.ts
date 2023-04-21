import sendgridClient from "@sendgrid/mail";

export type { MailDataRequired } from "@sendgrid/mail";

sendgridClient.setApiKey(import.meta.env.SENDGRID_API_KEY);

export const sendEmails = sendgridClient.send.bind(sendgridClient);
