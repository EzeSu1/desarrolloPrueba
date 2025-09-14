import  PedidosController from "../controllers/pedidosController.js"
import express from "express"

const router = express.Router()

const pathPedidos = "/pedidos"

router.get(pathPedidos + "/:id", (req, res) => {
    PedidosController.obtenerPedido(req, res)
})

router.post(pathPedidos, (req, res) => {
    PedidosController.crearPedido(req, res)
})

router.put(pathPedidos + "/:id", (req, res) => {
    PedidosController.actualizarPedido(req, res)
})

router.delete(pathPedidos + "/:id", (req, res) => {
    PedidosController.eliminarPedido(req,res)
})

export default router