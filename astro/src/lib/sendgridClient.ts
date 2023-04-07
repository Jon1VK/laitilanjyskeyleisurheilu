import sendgridClient from "@sendgrid/mail";

sendgridClient.setApiKey(import.meta.env.SENDGRID_API_KEY);

export default sendgridClient;
