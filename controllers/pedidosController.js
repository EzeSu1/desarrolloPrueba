import { idTransform, validarIdParam, showBodyErrors } from "./validadores.js"
import { pedidoSchema } from "./schemas/pedidoSchema.js";
import { cambioEstadoSchema } from "./schemas/cambioEstadoSchema.js";
import PedidosDTOs from "../DTOs/pedidosDTOs.js";
import PedidosService from "../services/pedidosService.js";



export class PedidosController {

    obtenerPedido(req, res, next) {
        const pedido_id = validarIdParam(req, res, next)

        PedidosService.obtenerPedido(pedido_id)
            .then(pedido => res.status(200).json(PedidosDTOs.pedidoToDTO(pedido)))
            .catch(next)
    }

    crearPedido(req, res,next) {
        const result_body = pedidoSchema.safeParse(req.body)

        if (!result_body.success) {
            return showBodyErrors(req, res, result_body)
        }

        PedidosService.crearPedido(result_body.data)
            .then(pedidoCreado=> res.status(201).json(PedidosDTOs.pedidoToDTO(pedidoCreado)))
            .catch(next)
    }

    actualizarPedido(req, res, next) {
        const result_id = idTransform.safeParse(req.params.id)
        const result_body = cambioEstadoSchema.safeParse(req.body)

        if (!result_body.success) {
            return showBodyErrors(result_body)
        }
        else if (result_id.error) {
            return res.status(400).json(result_body.error.issues)
        }

        const id_pedido = result_id.data
        const nuevo_estado_json = result_body.data
        PedidosService.actualizarPedido(id_pedido, nuevo_estado_json)
            .then(pedidoActualizado => res.status(200).json(PedidosDTOs.pedidoActualizadoOutPutDTO(pedidoActualizado)))
            .catch(next)
    }

    eliminarPedido(req, res, next) {
        const pedido_id = validarIdParam(req, res)

        PedidosService.eliminarPedido(pedido_id)
            .then(pedidoEliminado => res.status(200).json(PedidosDTOs.pedidoToDTO(pedidoEliminado)))
            .catch(next)
    }

    /*
    static instance() {
        if (!PedidosController.singleton) {
            PedidosController.singleton = new PedidosController();
        }
        return PedidosController.singleton;
    }
    */
}

export default new PedidosController();