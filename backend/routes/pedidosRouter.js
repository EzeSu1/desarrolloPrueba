import  PedidosController from "../controllers/pedidosController.js"
import express from "express"
import {errorHandler} from "../middlewares/errorHandler.js";
import {queryParamsHandler} from "../middlewares/queryParamsHandler.js";

const router = express.Router()


router.route("/")
    .get(queryParamsHandler, PedidosController.obtenerPedidosPaginado)
    .post(PedidosController.crearPedido)

router.route("/:id")
    .get(PedidosController.obtenerPedido)
    .patch(PedidosController.actualizarPedido)



router.use(errorHandler)

export default router