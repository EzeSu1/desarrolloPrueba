import { Producto } from "./producto.js"
import mongoose from "mongoose";



export const itemOrderSchema = new mongoose.Schema({
    producto: {type : mongoose.Schema.Types.ObjectId, ref : "Producto", required : true},
    cantidad: {type : Number , default : 0},
    precio_unitario: {type : Number , default : 0}
}, { _id: false })

export class ItemPedido {
    constructor(producto, cantidad) {
        this.producto = producto
        this.cantidad = cantidad
        this.precio_unitario = producto.precio
    }

    subtotal() {
        return this.cantidad * this.precio_unitario
    }

    nombreProducto(){
        return this.producto.titulo
    }

    reducirStock(){
        return this.producto.reducirStock(this.cantidad);
    }
}