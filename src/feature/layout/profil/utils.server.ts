"use server";
import { prisma } from "@/lib/prisma";
import { getUserLog } from "@/src/query/user.query";
import bcrypt from "bcrypt";

export const updatePwd = async ({
  id,
  newPassword,
  newPasswordConfirm
}: {
  id: string;
  newPassword: string;
  newPasswordConfirm: string;
}
) => {
  // On créé un nouvel article
  const user = await getUserLog();
  if (!user) {
    throw new Error("User not logged in");
  }
  if (user.id != id) {
    throw new Error("Bad user");
  }
  // On vérifie que les deux mots de passe sont identiques
  if (newPassword !== newPasswordConfirm) {
    return "Les mots de passe ne sont pas identiques";
  }
  // On hash le mot de passe
  const hash = await bcrypt.hash(newPassword, 10);
  // On update le mot de passe
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      hashedPassword: hash,
    },
  });
  return true;
};
