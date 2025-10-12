import UsuariosController from "../controllers/usuariosController.js"
import express from "express"
import {errorHandler} from "../middlewares/errorHandler.js";
import {queryParamsHandler} from "../middlewares/queryParamsHandler.js";

const router = express.Router()


router.route("/:id")
    .get(UsuariosController.obtenerUsuario)

router.route("/:id/notificaciones")
    .get(queryParamsHandler, UsuariosController.obtenerNotificacionesUsuario)

router.route("/:id/pedidos")
    .get(UsuariosController.obtenerPedidosUsuario)

router.route("/:id/productos")
    .get(queryParamsHandler, UsuariosController.obtenerProductosUsuario)

router.route("/")
    .post(UsuariosController.crearUsuario)


router.use(errorHandler)

export default router