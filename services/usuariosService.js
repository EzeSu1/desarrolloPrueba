import UsuariosRepository from '../repositories/usuariosRepository.js';
import PedidosService from './pedidosService.js';
import UsuariosMapper   from "../mappers/usuariosMapper.js";
import NotificacionesService from './notificacionesService.js';
import {UserDoesNotExist} from "../errors/UserDoesNotExist.js";


class UsuariosService {
    constructor() {
        this.usuariosRepository = new UsuariosRepository()
    }

    obtenerUsuario(usuario_id) {
        return this.usuariosRepository.findById(usuario_id)
            .then(usuario => {
                if (!usuario) {
                    throw new UserDoesNotExist(usuario_id)
                }

                return usuario;
            })
    }

    obtenerPedidosUsuario(usuario_id) {
        return this.obtenerUsuario(usuario_id)
            .then(usuario => {
                return PedidosService.obtenerPedidosPorIdUsuario(usuario.getId())
                    .then(pedidos => pedidos)
            })
    }

    obtenerNotificacionesUsuario(usuario_id) {
        return this.obtenerUsuario(usuario_id)
            .then(usuario => NotificacionesService.obtenerNotificaciones(usuario.getId()))
            .then(notificaciones => notificaciones)
    }

    crearUsuario(nuevo_usuario_json) {
        const nuevo_usuario = UsuariosMapper.map(nuevo_usuario_json)

        return this.usuariosRepository.save(nuevo_usuario)
            .then(usuario => usuario)
    }
    /*
    static instance() {
        if (!UsuariosService.singleton) {
            UsuariosService.singleton = new UsuariosService();
        }
        return UsuariosService.singleton;
    }
    */

}

export default new UsuariosService();