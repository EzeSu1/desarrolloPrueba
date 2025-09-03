import { Router } from "express";
import { getHealth } from "../controller/controller.js"; // Cambia require por import

const router = Router();

router.get("/health", getHealth); 


export default router;