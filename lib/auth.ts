import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import { env } from "./env";
import { AuthOptions, User, getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      authorize: async (
        credentials: Record<"email" | "password", string> | undefined
      ) => {
        console.log("Credentials provided:", credentials);

        if (!credentials) {
          console.log("ok");
          return null;
        }

        const user = (await prisma.user.findUnique({
          where: { email: credentials.email },
        })) as any;


        if (
          user &&
          (await bcrypt.compare(credentials.password, user.hashedPassword))
        ) {
            console.log(user)
          return user; // Assurez-vous que l'objet utilisateur correspond au type attendu par NextAuth.
        } else {
          return null;
        }
      },
    }),
    ],
    session: {
      strategy:"jwt"
  },
  secret: process.env.NEXTAUTH_SECRET, // Ajoutez cette ligne
  callbacks: {
    // async session({ session, user }) {
    //   if (!session?.user) return session;
    //   session.user.id = user.id;
    //   return session;
    //   },
     
  },
};

export const getAuthSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
