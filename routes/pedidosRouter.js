import  PedidosController from "../controllers/pedidosController.js"
import express from "express"
import {errorHandler} from "../middlewares/errorHandler.js";

const router = express.Router()


router.route("/")
    .post(PedidosController.crearPedido)

router.route("/:id")
    .get(PedidosController.obtenerPedido)
    .patch(PedidosController.actualizarPedido)

// Por ahora, hacemos el PATCH directo para actualizar el pedido. Mas adelante,, si hay otro tipo de PATCH para el pedido, volver a este path "/:id/estadoPedido"


router.use(errorHandler)

export default router