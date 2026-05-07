import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header : ", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant ou mal formaté" });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.error("Erreur dans authMiddleware : ", error);
    return res.status(401).json({ message: "Token invalide" });
  }
};
