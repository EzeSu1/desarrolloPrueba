import mongoose from "mongoose";
import {categoriaSchema} from "./categoria.js";


const productoSchema = new mongoose.Schema({
    vendedor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    categorias: [categoriaSchema],
    precio: Number,
    moneda: String,
    stock: Number,
    fotos: [String],
    activo: { type: Boolean, default: true },
    },{timestamps : true, collection : "Productos"});



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


    getIdVendedor() {
        return this.vendedor._id
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

productoSchema.loadClass(Producto)

export const ProductoModel= mongoose.model("Producto", productoSchema)