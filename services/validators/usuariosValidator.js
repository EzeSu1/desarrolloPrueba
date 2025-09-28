import {UserDoesNotExist} from "../../errors/UserDoesNotExist.js";

import {InvalidRolError} from "../../errors/InvalidRolError.js";


class UsuariosValidator {
    validarUsuario(usuario) {
        if (!usuario) {
            throw new UserDoesNotExist()
        }

        return usuario
    }

    validarRol(usuario, rol) {
        if (usuario.tipo !== rol) {
            throw new InvalidRolError(rol)
        }

        return usuario
    }

    validarVendedor(usuario) {
        return this.validarRol(usuario, "VENDEDOR")
    }

    validarComprador(usuario) {
        return this.validarRol(usuario, "COMPRADOR")
    }
}


export default new UsuariosValidator()