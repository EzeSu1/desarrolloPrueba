import UsuariosRepository from '../repositories/usuariosRepository.js';
import PedidosService from './pedidosService.js';
import { Usuario } from "../models/entities/usuario.js";
import UsuariosMapper   from "../mappers/usuariosMapper.js";

class UsuariosService {
    constructor() {
        this.usuariosRepository = new UsuariosRepository()
    }

    obtenerUsuario(id) {
        return this.usuariosRepository.findById(id)
    }

    obtenerPedidosUsuario(id) {
        return PedidosService.obtenerPedidosPorUserId(id)
    }

    crearUsuario(nuevoUsuarioJson) {
        const nuevoUsuario = UsuariosMapper.map(nuevoUsuarioJson)

        return this.usuariosRepository.save(nuevoUsuario)
    }
}

export default new UsuariosService()