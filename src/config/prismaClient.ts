import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

const adapter = new PrismaPg(pool);

declare global {
  var prisma: PrismaClient | undefined;
}
export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
prisma.$extends({
  query: {
    $allModels: {
      async $allOperations({ args, query }) {
        try {
          return await query(args);
        } catch (error: any) {
          if (
            error.code === "P1001" ||
            error.message?.includes("connection") ||
            error.message?.includes("Closed")
          ) {
            console.log("🔄 Tentando reconectar ao banco...");
            try {
              await prisma.$connect();
              return await query(args);
            } catch (reconnectError) {
              console.error("❌ Falha na reconexão:", reconnectError);
              throw error;
            }
          }
          throw error;
        }
      },
    },
  },
});
