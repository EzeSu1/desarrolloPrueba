import { idTransform, validarIdParam, showBodyErrors } from "./validadores.js"
import { pedidoSchema } from "./schemas/pedidoSchema.js";
import { cambioEstadoSchema } from "./schemas/cambioEstadoSchema.js";
import PedidosDTOs from "../DTOs/pedidosDTOs.js";
import PedidosService from "../services/pedidosService.js";



export class PedidosController {

    obtenerPedido(req, res) {
        const pedido_id = validarIdParam(req, res)

        return PedidosService.obtenerPedido(pedido_id)
            .then(pedido => res.status(200).json(PedidosDTOs.pedidoToDTO(pedido)))
    }

    crearPedido(req, res) {
        const result_body = pedidoSchema.safeParse(req.body)

        if (!result_body.success) {
            return showBodyErrors(req, res, result_body)
        }

        return PedidosService.crearPedido(result_body.data)
            .then(pedidoCreado=> res.status(201).json(PedidosDTOs.pedidoToDTO(pedidoCreado)))
    }

    actualizarPedido(req, res) {
        const result_id = idTransform.safeParse(req.params.id)
        const result_body = cambioEstadoSchema.safeParse(req.body)

        if (!result_body.success) {
            return showBodyErrors(req, res, result_body)
        }
        if (result_id.error) {
            return res.status(400).json(result_body.error.issues)
        }

        const id_pedido = result_id.data
        const nuevo_estado_json = result_body.data

        return PedidosService.actualizarPedido(id_pedido, nuevo_estado_json)
            .then(pedidoActualizado => res.status(200).json(PedidosDTOs.pedidoActualizadoOutPutDTO(pedidoActualizado)))
    }
}


export default new PedidosController();