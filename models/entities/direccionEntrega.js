import mongoose from "mongoose";

export const direccionEntregaSchema = new mongoose.Schema({
    calle: { type: String, required: true },
    altura: { type: Number, required: true },
    piso: { type: Number },
    departamento: { type: String },
    codigo_postal: { type: String, required: true },
    ciudad: { type: String, required: true },
    provincia: { type: String, required: true },
    pais: { type: String, required: true },
    latitud: { type: Number },
    longitud: { type: Number }
}, { _id: false });

export class DireccionEntrega {
    constructor(calle, altura, piso, departamento, codigoPostal, ciudad, provincia, pais, latitud, longitud) {
        this.calle = calle
        this.altura = altura
        this.piso = piso
        this.departamento = departamento
        this.codigo_postal = codigoPostal
        this.ciudad = ciudad
        this.provincia = provincia
        this.pais = pais
        this.latitud = latitud
        this.longitud = longitud
    }
}