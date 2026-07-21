import { PrismaClient } from '@prisma/client';

/**
 * Instancia unica (singleton) do PrismaClient.
 * O guard em globalThis evita criar multiplas conexoes durante o
 * hot-reload do tsx em desenvolvimento.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
