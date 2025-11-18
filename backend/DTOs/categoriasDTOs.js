class CategoriasDTOs {
    categoriaToDTO(categoria) {
        return {
            "nombre": categoria.nombre,
            "imagen": categoria.imagen
        }
    }

    categoriasToDTO(categorias) {
        return categorias.map(categoria => this.categoriaToDTO(categoria))
    }
}

export default new CategoriasDTOs()