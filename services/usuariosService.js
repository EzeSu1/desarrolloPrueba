import UsuariosRepository from '../repositories/usuariosRepository.js';
import PedidosService from './pedidosService.js';
import UsuariosMapper   from "../mappers/usuariosMapper.js";
import NotificacionesService from './notificacionesService.js';
import UsuariosValidator from "./validators/usuariosValidator.js";



class UsuariosService {
    constructor() {
        this.usuariosRepository = new UsuariosRepository()
    }

    obtenerUsuario(usuario_id) {
        return this.usuariosRepository.findById(usuario_id)
            .then(usuario => UsuariosValidator.validarUsuario(usuario))
            //.then(usuario=>usuario) // TODO: SACAR
    }

    obtenerPedidosUsuario(usuario_id) {
        return this.obtenerUsuario(usuario_id)
            .then(usuario => PedidosService.obtenerPedidosPorIdUsuario(usuario._id))
            .then(pedidos => pedidos)// TODO: SACAR
    }

    obtenerNotificacionesUsuario(usuario_id) {
        return this.obtenerUsuario(usuario_id)
            .then(usuario => NotificacionesService.obtenerNotificaciones(usuario._id))
            .then(notificaciones => notificaciones)// TODO: SACAR
    }

    crearUsuario(nuevo_usuario_json) {
        const nuevo_usuario = UsuariosMapper.map(nuevo_usuario_json)

        return this.usuariosRepository.save(nuevo_usuario)
            .then(usuario => usuario) // TODO: SACAR
    }
}


export default new UsuariosService();