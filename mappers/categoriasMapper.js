import {Categoria} from "../models/entities/categoria.js";



class CategoriasMapper{

    map(categoriasJson) {
        return categoriasJson.map(c => new Categoria(c.nombre));
    }
}


export default new CategoriasMapper()