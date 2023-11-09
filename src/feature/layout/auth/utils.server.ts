"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt';
export const createToken = async (email: string) => {
  // On recherche un utilisateur avec cet email
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    // On vérifie si un token existe déjà pour cet utilisateur
    const userToken = await prisma.userToken.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (userToken) {
      // Si un token existe on le retourne par mail
      // FIXME: send email
      return null;
    }
    // On génère un token
    const token = Math.random().toString(36).substr(2);
    // On sauvegarde le token dans la base de données
    const newToken = await prisma.userToken.create({
      data: {
        token: token,
        userId: user.id,
      },
    });
    // On envoie un email avec le token
    // FIXME: send email
    return true;
  }
  return false;
};


export const checkTokenAndUser = async (token: string, userId: string) => {
  // On recherche un token pour cet utilisateur
  const userToken = await prisma.userToken.findFirst({
    where: {
      userId: userId,
      token: token,
    },
  });
  if (userToken) {
    return true;
  }
  return false;
  
}

export const updatePassword = async (token: string, userId: string, password: string) => {
  // On recherche un token pour cet utilisateur
  const userToken = await prisma.userToken.findFirst({
    where: {
      userId: userId,
      token: token,
    },
  });
  if (userToken) {
    // On met à jour le mot de passe de l'utilisateur
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedPassword: await bcrypt.hash(password, 10)
      },
    });
    if (user) {
      // On supprime le token
      await prisma.userToken.delete({
        where: {
          id: userToken.id,
        },
      });
      return true;
    } else {
      return false;
    }
  }
  return false;
}
