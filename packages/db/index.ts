import { PrismaClient } from "@prisma/client";

export * from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      import.meta.env.NODE_ENV === "development" || import.meta.env.DEV
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (import.meta.env.NODE_ENV !== "production" || !import.meta.env.DEV) {
  globalForPrisma.prisma = prisma;
}
