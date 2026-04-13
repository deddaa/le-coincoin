import { db } from "../config/db.js";

export const getAllUsers = async () => {
    try {
        const [rows]= await db.query("SELECT * FROM users")
        return rows
    } catch (error) {
        console.error("erreur getAllUsers : ", error);
        throw error;
    }
}

export const findUsersByEmail = async (email) => {
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email])
        return rows[0]
    } catch (error) {
        console.error("erreur findUsersByEmail : ", error);
        throw error;
    }
}

export const createUser = async ({email , username , password_hash}) => {
    try {
        const [result] = await db.query("INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)", [email, username, password_hash])
        return result
    } catch (error) {
        console.error("erreur createUser : ", error);
        throw error;
    }
};