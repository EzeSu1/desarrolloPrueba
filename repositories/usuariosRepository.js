

class UsuariosRepository {
    constructor() {
        this.usuarios = []
        this.ultimo_id = 1;
    }

    findById(id) {
        return this.usuarios.find(usuario => usuario.id === id)
    }

    save(usuario) {
        usuario.id = this.ultimo_id++
        this.usuarios.push(usuario)
        return usuario
    }
}

export default UsuariosRepository