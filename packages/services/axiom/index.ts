export const logError = async (error: Error) => {
  await fetch("https://cloud.axiom.co/api/v1/datasets/frontend/ingest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.PUBLIC_AXIOM_TOKEN}`,
    },
    body: JSON.stringify([
      {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      },
    ]),
  });
};

const axiomLogger = {
  error: logError,
};

export const logger = import.meta.env.PROD ? axiomLogger : console;
