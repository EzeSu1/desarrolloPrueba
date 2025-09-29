import { Producto } from "./producto.js"
import mongoose from "mongoose";

export const itemPedidoSchema = new mongoose.Schema({
    producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
    cantidad: { type: Number, required: true },
    precio_unitario: { type: Number } // opcional, si querés calcular total
}, { _id: false });

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