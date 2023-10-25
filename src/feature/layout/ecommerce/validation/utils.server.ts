"use server";
import { getUser } from "@/src/query/user.query";
import bcrypt from 'bcrypt';
import { getUserLog } from "@/src/query/user.query";

export const isEmailExists = async (email: string) => {
    const user = await getUser(email);
    if (user) {
        console.log("Utilisateur trouvé:", user);
        // Vous pouvez retourner des données ou un booléen ici si nécessaire.
        return true;
    } else {
        console.log("Aucun utilisateur trouvé avec cet e-mail.");
        return false;
    }
};

export const hashPassword = async (password: string) => {
    const hp = await bcrypt.hash(password, 10)
    return hp;
};

export const isUserLog = async () => {
    return await getUserLog()

}

