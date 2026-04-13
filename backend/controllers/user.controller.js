import argon2 from "argon2";
import { registerSchema } from "../validations/auth.validation.js";
import { createUser , findUsersByEmail } from "../models/user.model.js";

export const register = async (req,res) => {
    try {
        const { email, password_hash, username } = req.body

        const { error } = registerSchema.validate({ email, password_hash, username});
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existiongUser = await findUsersByEmail(email);
            if (existiongUser) {
                return res.status(400).json({ message: "L'utilisateur existe deja !"});
            }

            const hash = await argon2.hash(password_hash);

            await createUser({ email,username, password_hash: hash });

            res.status(201).json({ message: "Utilisateur créé avec succès !" });
    } catch (error) {
        console.error("Erreur dans register : ", error);
        res.status(500).json({ message: "Erreur serveur createUser" });
    }
}