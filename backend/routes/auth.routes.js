import express from "express";
import { register, login , refresh } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login)
router.get("/me",authMiddleware, (req, res) => {
  res.json({ user: req.user })
});
router.post("/refresh",refresh);
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Déconnecté !" });
});

export default router;