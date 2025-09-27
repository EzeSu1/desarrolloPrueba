import  PedidosController from "../controllers/pedidosController.js"
import express from "express"
import {errorHandler} from "../middlewares/errorHandler.js";


const router = express.Router()


router.route("/")
    .post((req, res, next) => {
        PedidosController.crearPedido(req, res, next)
    })
    .delete((req, res, next) =>{
        PedidosController.eliminarPedido(req, res, next)
    })


router.route("/:id")
    .get((req, res, next) => {
    PedidosController.obtenerPedido(req, res, next)
    })
    .delete((req, res, next) =>{
        PedidosController.eliminarPedido(req, res, next)
    })
    .patch((req, res, next)=>{
        PedidosController.actualizarPedido(req, res, next)
    })
//por ahora hacemos el patch directo para actualizar el pedido,
// mas adelante si hay otro tipo de patch para el pedido, volver a este path "/:id/estadoPedido"




router.use(errorHandler)

export default router