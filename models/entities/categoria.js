import mongoose from "mongoose";



export const categorySchema = new mongoose.Schema({
    nombre : {type : String, require: true}
}, {_id: false})

export class Categoria {
    constructor(nombre) {
        this.nombre = nombre
    }
}