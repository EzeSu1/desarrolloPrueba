import healthRoutes from "./healthRoutes.js";
import usersRoutes from "./usuariosRoutes.js";
import pedidosRoutes from "./pedidosRoutes.js";
import productoRoutes from "./productosRoutes.js";
import express from "express";

const router = express.Router()
//respetar estos ordenes

router.use("/health-check", healthRoutes)
router.use("/usuarios", usersRoutes)
router.use("/productos", productoRoutes)
router.use("/pedidos", pedidosRoutes)


export default router