const CALLMEBOT_PHONE = import.meta.env.CALLMEBOT_PHONE;
const CALLMEBOT_API_KEY = import.meta.env.CALLMEBOT_API_KEY;

const sendWhatsAppMessage = async (text: string) => {
  const encodedText = encodeURIComponent(text);
  await fetch(
    `https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${encodedText}&apikey=${CALLMEBOT_API_KEY}`
  );
};

const callMeBotClient = { sendWhatsAppMessage };

export default callMeBotClient;
