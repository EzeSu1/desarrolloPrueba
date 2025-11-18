import {Categoria} from "../models/entities/categoria.js";


class CategoriasMapper{
    map(categoriaJson) {
        return new Categoria(categoriaJson.nombre)
    }
}

export default new CategoriasMapper()