import GithubProvider from "next-auth/providers/github";
import { env } from "./env";
import { AuthOptions, Session, getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt"; // Importez le type JWT
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
          label: "Adresse email",
          type: "text",
          placeholder: "hubrgiorgi@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },

      authorize: async (
        credentials: Record<"email" | "password", string> | undefined
      ) => {
        console.log("Credentials provided:", credentials);

        if (!credentials) {
          return null;
        }

        const user = (await prisma.user.findUnique({
          where: { email: credentials.email },
        })) as any;
        // console.log(user);  // Ajoutez cette ligne

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.hashedPassword))
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // Ajoutez cette ligne
  callbacks: {

    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id; // Assumant que user.id existe
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.userId) {
        // Créez un nouvel objet user avec l'id de l'utilisateur
        const user = { ...session.user, id: token.userId };

        // Créez un nouvel objet session avec le nouvel objet user
        const newSession = { ...session, user };

        return newSession;
      }

      return session;
    },
  },
  pages: {
    signIn: "/connexion",
    error: "/connexion/error",
  },
};

export const getAuthSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const getCoucou  = async () => {
  return "ok";
}
