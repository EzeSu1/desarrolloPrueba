import PedidosService from "../services/pedidosService.js"
import { pedidoSchema, idTransform } from "./validadores.js"
import usuariosService from "../services/usuariosService.js";
import productoService from "../services/productoService.js";


class PedidosController {
    obtenerPedido(req, res) {
        const resultId = idTransform.safeParse(req.params.id)

        if (resultId.error) {
            res.status(400).json(resultId.error.issues)
            return
        }

        const pedido = PedidosService.obtenerPedido(resultId.data);

        if (!pedido) {
            res.status(404).json({error: "Pedido no encontrado con ese ID"})
            return
        }

        res.status(200).json(pedido)
    }

    crearPedido(req, res) {
        const resultBody = pedidoSchema.safeParse(req.body)

        if (!resultBody.success) {
            res.status(400).json(resultBody.error.issues)
            return
        }

        const pedidoCreado = PedidosService.crearPedido(resultBody.data);

        if (!pedidoCreado) {
            res.status(500).json({error: "Error al crear el pedido"})
            return
        }

        res.status(201).json(pedidoCreado)
    }

    /// probar
    actualizarPedido(req, res) {
        const resultId = idTransform.safeParse(req.params.id)
        const resultBody = pedidoSchema.safeParse(req.body)

        if (!resultBody.success || resultId.error) {
            res.status(400).json(resultBody.error.issues)
            return
        }

        const idPedido = resultId.data
        const nuevoPedido = resultBody.data
        PedidosService.actualizarPedido()
    }

    eliminarPedido(req, res) {
        PedidosService.eliminarPedido()
    }


}

export default new PedidosController();