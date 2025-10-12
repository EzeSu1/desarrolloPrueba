import {Usuario} from "../models/entities/usuario.js";


class UsuariosMapper {

    map(usuarioJson) {
        return new Usuario(usuarioJson.nombre,usuarioJson.email, usuarioJson.telefono, usuarioJson.tipo)
    }
}

export default new UsuariosMapper()