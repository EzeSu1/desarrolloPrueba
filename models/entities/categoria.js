import mongoose from "mongoose";

export const categoriaSchema = new mongoose.Schema({
    nombre: { type: String, required: true }}
    ,{ _id: false })
export class Categoria {
    constructor(nombre) {
        this.nombre = nombre
    }
}