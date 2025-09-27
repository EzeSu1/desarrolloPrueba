class ProductosDTOs {
    productoToDTO(producto) {
        return {
            "vendedor": producto.getIdVendedor(),
            "titulo": producto.titulo,
            "descripcion":producto.descripcion,
            "categorias": producto.categorias,
            "precio": producto.precio,
            "moneda": producto.moneda,
            "stock": producto.stock,
            "fotos": producto.fotos,
        }
    }

    productosToDTO(productos){
        return productos.map(producto => this.productoToDTO(producto))
    }
}

export default new ProductosDTOs()