import express from "express";
import { getAnnonces, getAnnonceById, createAnnonce, updateAnnonce, deleteAnnonce } from "../controllers/annonce.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/", getAnnonces);
router.get("/:id", getAnnonceById);
router.post("/create", authMiddleware, createAnnonce);
router.put("/update/:id" , authMiddleware, updateAnnonce);
router.delete("/delete/:id" , authMiddleware, deleteAnnonce);

export default router;