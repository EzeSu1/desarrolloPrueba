import mongoose from "mongoose";


export const directionOrderSchema = new mongoose.Schema({
    calle: { type: String, required: true },
    altura: { type: Number, required: true },
    piso: { type: Number },
    departamento: { type: String },
    codigo_postal: { type: String, required: true },
    ciudad: { type: String, required: true },
    provincia: { type: String, required: true },
    pais: { type: String, required: true }
}, { _id: false });


export class DireccionEntrega {
    constructor(calle, altura, piso, departamento, codigoPostal, ciudad, provincia, pais) {
        this.calle = calle
        this.altura = altura
        this.piso = piso
        this.departamento = departamento
        this.codigo_postal = codigoPostal
        this.ciudad = ciudad
        this.provincia = provincia
        this.pais = pais
    }
}