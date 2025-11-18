import {CategoriaDoesNotExist} from "../../errors/CategoriaDoesNotExist.js";
import {CategoriasRepetidasError} from "../../errors/CategoriasRepetidasError.js";


class CategoriasValidator {
    validarCategoria(categoria) {
        if (!categoria) {
            throw new CategoriaDoesNotExist()
        }

        return categoria
    }

    validarUnicidad(categorias) {
        if(new Set(categorias).size !== categorias.length) {
            throw new CategoriasRepetidasError()
        }

        return categorias
    }

}


export default new CategoriasValidator()