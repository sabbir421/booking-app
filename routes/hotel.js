import express from "express";
import hotel from "../models/hotel.js";

const router = express.Router();
router.post("/");
router.put("/:id");
router.delete("/:id");
router.get("/find/:id");
export default router;
