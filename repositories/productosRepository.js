class ProductosRepository {
    constructor() {
        this.productos = []
        this.ultimo_id = 1;
    }

    findById(id) {
        return this.productos.find(producto => producto.id === id)
    }

    save(producto) {
        producto.id = this.ultimo_id++
        this.productos.push(producto)
        return producto
    }
}

export default ProductosRepository