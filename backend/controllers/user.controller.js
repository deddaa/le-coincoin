import argon2 from "argon2";
import { registerSchema } from "../validations/auth.validation.js";
import { createUser , findUsersByEmail } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  maxAge: 24*60*60*1000
}

function generateToken(payload) {
    const accessToken= jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: "15m"}
    )
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    )
    return { accessToken, refreshToken }
}

export const register = async (req,res) => {
    try {
        const { email, password, username } = req.body

        const { error } = registerSchema.validate({ email, password, username});
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existiongUser = await findUsersByEmail(email);
            if (existiongUser) {
                return res.status(400).json({ message: "L'utilisateur existe deja !"});
            }

            const hash = await argon2.hash(password);

            await createUser({ email,username, password: hash });

            res.status(201).json({ message: "Utilisateur créé avec succès !" });
    } catch (error) {
        console.error("Erreur dans register : ", error);
        res.status(500).json({ message: "Erreur serveur createUser" });
    }
}


export const login = async (req, res, next) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe sont requis" });
    }

    const user = await findUsersByEmail(email);
    console.log("user trouvé :", user);
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const isPasswordValid = await argon2.verify(
      user.password,
      password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    /*const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    console.log("Token généré :", token);*/

    const { accessToken, refreshToken } = generateToken({ id: user.id, email: user.email, username: user.username });

    /*res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });*/
    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    console.log("Access token généré :", accessToken, "Refresh token généré :", refreshToken);
    res.status(200).json({ message: "Connexion réussie !", accessToken });
  } catch (error) {
    next(error);
    console.error("Erreur dans login : ", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const refresh = async (req, res, next) => {
  console.log("Requête de refresh reçue, cookies :", req.cookies.refreshToken);
  try {
    const refreshTokenOld = req.cookies.refreshToken;
    if(!refreshTokenOld) {
      return res.status(401).json({ message: "Token refresh manquant"});
    }
    let payload;
    try {
      payload = jwt.verify(refreshTokenOld, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Token refresh invalide ou expiré"});
    }
    const user = await findUsersByEmail(payload.email);
    if(!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé"});
    }
    const { accessToken, refreshToken } = generateToken({ id: user.id, email: user.email, username: user.username });
    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
}