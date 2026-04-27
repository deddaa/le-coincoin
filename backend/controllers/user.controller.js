import argon2 from "argon2";
import { registerSchema } from "../validations/auth.validation.js";
import { createUser , findUsersByEmail } from "../models/user.model.js";
import jwt from "jsonwebtoken";
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

export const login = async (req,res) => {
    try {
        const { email, password_hash, username} = req.body
        const user = await findUsersByEmail(email);
        if (!user){
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        const isPasswordValid = await argon2.verify(
            user.password_hash,
            password_hash
        )
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("token", token, {
            httponly: true,
            sameSite: "strict",
            maxAge: 24 *60 *60 * 1000
        });

        res.status(200).json({ message : "Connexion réussie !" });
    } catch (error) {
        console.error("Erreur dans login : ", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}