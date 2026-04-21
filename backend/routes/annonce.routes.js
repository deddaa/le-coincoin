import express from "express";
import { getAnnonces, getAnnonceById, createAnnonce, updateAnnonce, deleteAnnonce } from "../controllers/annonce.controller.js";

const router = express.Router();

router.get("/", getAnnonces);
router.get("/:id", getAnnonceById);
router.post("/create", createAnnonce);
router.put("/update/:id" , updateAnnonce);
router.delete("/delete/:id" , deleteAnnonce);

export default router;