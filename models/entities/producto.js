import mongoose from "mongoose";
import {categorySchema} from "./categoria.js";
import {Usuario} from "./usuario.js";


const productSchema = new mongoose.Schema({
    vendedor: {type : mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true},
    titulo: {type : String, required : true},
    descripcion: {type : String ,required : true},
    categorias: [categorySchema],
    precio: {type: Number , default: 0},
    moneda: {type : String, required : true},
    stock: {type : Number, required : true},
    fotos: [{type : String, required : true}],
    activo: {type : Boolean, require : true},
}, {timestamps : true, collection : "Productos"})



export class Producto {
    constructor(vendedor, titulo, descripcion, categorias, precio, moneda, stock, fotos) {
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

    modificarPrecio(nuevoPrecio){
        this.precio = nuevoPrecio
    }

    setActivo(estado) {
        this.activo = estado
    }

    estaDisponible(cantidad) {
        return this.hayStock(cantidad) && this.activo
    }

    hayStock(cantidad) {
        return this.stock >= cantidad
    }

    reducirStock(cantidad) {
        this.stock -= cantidad
    }

    aumentarStock(cantidad) {
        this.stock += cantidad
    }
}

productSchema.loadClass(Producto)
export const ProductModel = mongoose.model("Producto", productSchema)