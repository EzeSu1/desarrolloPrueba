import {Usuario} from "../models/entities/usuario.js";

class UsuariosMapper {
    map(usuarioJson) {
        return new Usuario(usuarioJson.nombre,usuarioJson.email, usuarioJson.telefono, usuarioJson.tipo)
    }
    mapToUsuariosObject(dataObjects) {
        return dataObjects.map(this.mapToUsuarioObject);
    }

    mapToUsuarioObject(dataObjects){
        const {nombre, email, telefono, tipo } = dataObjects
        const usuario = new Usuario(nombre, email, telefono, tipo )
        usuario.id = dataObjects.id
        return usuario;
    }
}

export default new UsuariosMapper()