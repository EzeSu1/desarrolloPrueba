import { Producto } from "./producto.js"

export class ItemPedido {
    constructor(producto, cantidad, precioUnitario) {
        this.producto = producto
        this.cantidad = cantidad
        this.precio_unitario = precioUnitario
    }

    subtotal() {
        return this.cantidad * this.precio_unitario
    }

    nombreProducto(){
        return this.producto.titulo
    }
}