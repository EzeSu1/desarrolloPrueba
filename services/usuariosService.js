import UsuariosRepository from '../repositories/usuariosRepository.js';
import PedidosService from './pedidosService.js';
import ProductosService from "./productosService.js"
import UsuariosMapper   from "../mappers/usuariosMapper.js";
import NotificacionesService from './notificacionesService.js';
import UsuariosValidator from "./validators/usuariosValidator.js";



class UsuariosService {
    constructor() {
        this.usuariosRepository = new UsuariosRepository()
    }

    obtenerUsuario(usuarioId) {
        return this.usuariosRepository.findById(usuarioId)
            .then(usuario => UsuariosValidator.validarUsuario(usuario))
    }

    obtenerPedidosUsuario(usuarioId) {
        return this.obtenerUsuario(usuarioId)
            .then(usuario => PedidosService.obtenerPedidosPorIdUsuario(usuario._id))
    }

    obtenerProductosUsuario(usuarioId, pagina, filtros, ordenamiento) {
        return this.obtenerUsuario(usuarioId)
            .then(usuario => {
                UsuariosValidator.validarVendedor(usuario)
                return ProductosService.obtenerProductosPaginado(pagina,{ ...filtros, vendedor: usuario._id }, ordenamiento)
            })
    }

    obtenerNotificacionesUsuario(usuarioId, filtros) {
        return this.obtenerUsuario(usuarioId)
            .then(usuario => NotificacionesService.obtenerNotificaciones({ ...filtros, usuario_destino: usuario._id }))
    }

    crearUsuario(nuevoUsuarioJson) {
        const nuevo_usuario = UsuariosMapper.map(nuevoUsuarioJson)
        return this.usuariosRepository.save(nuevo_usuario)
    }
}


export default new UsuariosService();