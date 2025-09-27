import UsuariosService from "../services/usuariosService.js";
import { validarIdParam, showBodyErrors } from "./validadores.js"
import { usuarioSchema } from "./schemas/usuarioSchema.js";
import UsuariosDTOs from "../DTOs/usuariosDTO.js";
import PedidosDTOs from "../DTOs/pedidosDTOs.js";
import NotificacionesDTOs from "../DTOs/notificacionesDTOs.js";

class UsuariosController {

    obtenerUsuario(req, res, next) {
        const usuario_id = validarIdParam(req, res)

        UsuariosService.obtenerUsuario(usuario_id)
            .then(usuario => res.status(200).json(UsuariosDTOs.usuarioToDTO(usuario)))
            .catch(next)

    }

    obtenerNotificacionesUsuario(req, res, next) {
        const usuario_id = validarIdParam(req, res)

        UsuariosService.obtenerNotificacionesUsuario(usuario_id)
            .then(notificaciones => res.status(200).json(NotificacionesDTOs.notificacionesToDTO(notificaciones)))
            .catch(next)
    }

    obtenerPedidosUsuario(req, res, next) {
        const usuario_id = validarIdParam(req, res)

        UsuariosService.obtenerPedidosUsuario(usuario_id)
            .then(pedidos => res.status(200).json(PedidosDTOs.pedidosToDTO(pedidos)))
            .catch(next)
    }

    crearUsuario(req, res, next) {
        const body = req.body
        const result_body = usuarioSchema.safeParse(body)

        if (!result_body.success) {
            return showBodyErrors(req, res, result_body)
        }

        UsuariosService.crearUsuario(result_body.data)
            .then(usuario_creado => res.status(201).json(UsuariosDTOs.usuarioToDTO(usuario_creado)))
            .catch(next)
    }
    /*
    static instance() {
        if (!UsuariosController.singleton) {
            UsuariosController.singleton = new UsuariosController();
        }
        return UsuariosController.singleton;
    }
    */

}

export default new UsuariosController();

