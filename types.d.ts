import { PrismaClient } from "@prisma/client";

declare module "node" {
  interface Global {
    prisma?: PrismaClient;
  }
}

declare module 'bcrypt';
