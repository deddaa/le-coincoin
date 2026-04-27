import jwt from "jsonwebtoken";

export const authMiddleware = (req, res ,next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Token manquant" }); 
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Erreur dans authMiddleware : ", error);
        res.status(401).json({ message: "Token invalide" });
    }
}