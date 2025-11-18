import UsuariosRepository from '../repositories/usuariosRepository.js';
import PedidosService from './pedidosService.js';
import ProductosService from "./productosService.js"
import UsuariosMapper   from "../mappers/usuariosMapper.js";
import NotificacionesService from './notificacionesService.js';
import UsuariosValidator from "./validators/usuariosValidator.js";



class UsuariosService {
    obtenerUsuario(usuario_id) {
        return UsuariosRepository.findById(usuario_id)
            .then(usuario => UsuariosValidator.validarUsuario(usuario))
    }
    
    obtenerNotificacionesUsuario(usuario_id, filtros) {
        return this.obtenerUsuario(usuario_id)
            .then(usuario => NotificacionesService.obtenerNotificaciones({ ...filtros, usuario_destino: usuario._id }))
    }
    
    obtenerPedidosUsuario(usuarioId, pagina, filtros, ordenamiento) {
        return this.obtenerUsuario(usuarioId)
            .then(usuario => PedidosService.obtenerPedidosPaginado(pagina, { ...filtros, comprador: usuario._id }, ordenamiento))
    }

    obtenerProductosUsuario(usuario_id, pagina, filtros, ordenamiento) {
        return this.obtenerUsuario(usuario_id)
            .then(usuario => {
                UsuariosValidator.validarVendedor(usuario)
                return ProductosService.obtenerProductosPaginado(pagina, { ...filtros, vendedor: usuario_id }, ordenamiento)
            })
    }
    
    crearUsuario(nuevoUsuarioJson) {
        const nuevo_usuario = UsuariosMapper.map(nuevoUsuarioJson)
        return UsuariosRepository.save(nuevo_usuario)
    }
}


export default new UsuariosService();