import CategoriasRepository from '../repositories/categoriasRepository.js'
import CategoriasValidator from "./validators/categoriasValidator.js"


class CategoriasService {
    obtenerCategoria(categoria_nombre) {
        const categoria = CategoriasRepository.findByName(categoria_nombre)

        return CategoriasValidator.validarCategoria(categoria)
    }

    obtenerCategorias() {
        return CategoriasRepository.findAll()
    }
}

export default new CategoriasService();