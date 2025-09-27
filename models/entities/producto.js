export class Producto {
    constructor(vendedor, titulo, descripcion, categorias, precio, moneda, stock, fotos) {
        this.id = null
        this.vendedor = vendedor
        this.titulo = titulo
        this.descripcion = descripcion
        this.categorias = categorias
        this.precio = precio
        this.moneda = moneda
        this.stock = stock
        this.fotos = fotos
        this.activo = true
    }


    getIdVendedor() {
        return this.vendedor.getId()
    }

    getPrecio() {
        return this.precio
    }

    modificarPrecio(nuevoPrecio){
        this.precio = nuevoPrecio
    }

    setActivo(estado) {
        this.activo = estado
    }

    estaDisponible(cantidad) {
        return this.stock >= cantidad && this.activo
    }

    reducirStock(cantidad) {
        this.stock -= cantidad
    }

    aumentarStock(cantidad) {
        this.stock += cantidad
    }

}