import UsuariosController from "../controllers/usuariosController.js"
import express from "express"
import {errorHandler} from "../middlewares/errorHandler.js";



const router = express.Router()


router.route("/:id")
    .get((req, res, next) => {
        UsuariosController.obtenerUsuario(req, res, next)
    })

router.route("/:id/notificaciones")
    .get((req, res, next) => {
        UsuariosController.obtenerNotificacionesUsuario(req, res, next)
    })

router.route("/:id/pedidos")
    .get((req, res, next) => {
        UsuariosController.obtenerPedidosUsuario(req, res, next)
    })

router.route("/")
    .post((req, res, next) => {
        UsuariosController.crearUsuario(req, res, next)
    })


router.use(errorHandler)


export default router