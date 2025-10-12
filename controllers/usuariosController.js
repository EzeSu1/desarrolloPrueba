import UsuariosService from "../services/usuariosService.js";
import { validarIdParam, showBodyErrors } from "./validadores.js"
import { usuarioSchema } from "./schemas/usuarioSchema.js";
import UsuariosDTOs from "../DTOs/usuariosDTO.js";
import PedidosDTOs from "../DTOs/pedidosDTOs.js";
import NotificacionesDTOs from "../DTOs/notificacionesDTOs.js";
import ProductosDTOs from "../DTOs/productosDTO.js"



class UsuariosController {

    obtenerUsuario(req, res) {
        const usuario_id = validarIdParam(req, res)

        return UsuariosService.obtenerUsuario(usuario_id)
            .then(usuario => res.status(200).json(UsuariosDTOs.usuarioToDTO(usuario)))
    }

    obtenerNotificacionesUsuario(req, res) {
        const usuario_id = validarIdParam(req, res)

        return UsuariosService.obtenerNotificacionesUsuario(usuario_id, req.filters)
            .then(notificaciones => res.status(200).json(NotificacionesDTOs.notificacionesToDTO(notificaciones)))
    }

    obtenerPedidosUsuario(req, res) {
        const usuario_id = validarIdParam(req, res)

        return UsuariosService.obtenerPedidosUsuario(usuario_id)
            .then(pedidos => res.status(200).json(PedidosDTOs.pedidosToDTO(pedidos)))
    }

    obtenerProductosUsuario(req, res) {
        const usuario_id = validarIdParam(req, res)

        return UsuariosService.obtenerProductosUsuario(usuario_id, req.page, req.filters, req.sort)
            .then(productos => res.status(200).json(ProductosDTOs.productosToDTO(productos)))
    }

    crearUsuario(req, res) {
        const body = req.body
        const result_body = usuarioSchema.safeParse(body)

        if (!result_body.success) {
            return showBodyErrors(req, res, result_body)
        }

        return UsuariosService.crearUsuario(result_body.data)
            .then(usuario_creado => res.status(201).json(UsuariosDTOs.usuarioToDTO(usuario_creado)))
    }
}


export default new UsuariosController();