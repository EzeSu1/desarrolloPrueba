import {categorias} from "../categorias.js"


class CategoriasRepository {
    findByName(nombre_categoria) {
        const nombre_categorias = categorias.map(categoria => categoria.nombre)

        return nombre_categorias.find(categoria => categoria === nombre_categoria)
    }

    findAll() {
        return categorias
    }
}

export default new CategoriasRepository();