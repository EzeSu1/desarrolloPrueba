
import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String },
    tipo: { type: String, required: true},
    fecha_alta: { type: Date, default: Date.now, required: true }
}, {timestamps : true, collection : "Usuarios"});


export class Usuario {
    constructor(nombre, email, telefono, tipo) {
        this.nombre = nombre
        this.email = email
        this.telefono = telefono
        this.tipo = tipo
        this.fecha_alta = new Date()
    }
}


usuarioSchema.loadClass(Usuario)
export const UsuarioModel = mongoose.model('Usuario', usuarioSchema)