import NotificacionesController from "../controllers/notificacionesController.js"
import express from "express";
import {errorHandler} from "../middlewares/errorHandler.js"

const router = express.Router()


router.route("/:id/leerNotificacion")
    .post(NotificacionesController.leerNotificacion)


router.use(errorHandler)

export default router