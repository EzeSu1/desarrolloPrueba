import DireccionesRepository from "../repositories/direccionesRepository.js"
import DireccionesMapper from "../mappers/direccionesMapper.js"
import UsuariosService from "../services/usuariosService.js"

class DireccionesService {
    constructor() {
        this.direccionesRepository = new DireccionesRepository()
    }
    
    obtenerDireccion(id) {
        return this.direccionesRepository.findById(id)
    }

    crearDireccion(nuevaDireccionJSON) {
        const usuario = UsuariosService.obtenerUsuario(nuevaDireccionJSON.usuarioId)

        console.log(`------------------ Usuario ID: ${usuario}`)

        if (!usuario) {
            throw new Error("El usuario no existe")
        }

        const nuevaDireccion = DireccionesMapper.map(nuevaDireccionJSON, usuario)

        return this.direccionesRepository.save(nuevaDireccion)
    }

    actualizarDireccion(nuevaDireccionJSON, idDireccion){
        const usuario = UsuariosService.obtenerUsuario(nuevaDireccionJSON.usuarioId)

        if (!usuario) {
            throw new Error("El usuario no existe")
        }

        const nuevaDireccion = DireccionesMapper.map(nuevaDireccionJSON, usuario)

        return this.direccionesRepository.replace(nuevaDireccion, idDireccion)
    }

    eliminarDireccion(id) {
        return this.direccionesRepository.deleteById(id)
    }
}

export default new DireccionesService()