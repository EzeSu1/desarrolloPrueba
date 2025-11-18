import healthRoutes from "./healthRouter.js";
import usersRoutes from "./usuariosRouter.js";
import pedidosRoutes from "./pedidosRouter.js";
import productoRoutes from "./productosRouter.js";
import notificacionesRouter from "./notificacionesRouter.js"
import express from "express";
import loginRouter from "./loginRouter.js";
import categoriasRouter from "./categoriasRouter.js";

const router = express.Router()
// Respetar estos ordenes

router.use("/", loginRouter)
router.use("/health-check", healthRoutes)
router.use("/usuarios", usersRoutes)
router.use("/productos", productoRoutes)
router.use("/pedidos", pedidosRoutes)
router.use("/notificaciones", notificacionesRouter)
router.use("/categorias", categoriasRouter)


export default router