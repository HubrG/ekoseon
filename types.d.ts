import { PrismaClient } from "@prisma/client";

declare module "node" {
  interface Global {
    prisma?: PrismaClient;
  }
}

declare module 'bcrypt';

declare module 'js-cookie';
declare module 'validator';
declare module 'bcrypt';

declare module 'react-places-autocomplete'

declare module "uuid"
declare module 'cookie';
