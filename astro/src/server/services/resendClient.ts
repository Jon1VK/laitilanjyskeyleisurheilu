import { Resend } from "resend";

const resendClient = new Resend(import.meta.env.RESEND_API_KEY);

export { resendClient };
