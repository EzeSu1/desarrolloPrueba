class UsuariosDTOs {
    usuarioToDTO(usuario) {
        return {
            "id": usuario._id,
            "nombre": usuario.nombre,
            "email": usuario.email,
            "telefono": usuario.telefono,
            "tipo": usuario.tipo,
            "fecha_alta": usuario.fecha_alta
        }
    }

    usuariosToDTO(usuarios) {
        return usuarios.map(usuario => this.usuarioToDTO((usuario)))
    }
}

export default new UsuariosDTOs()