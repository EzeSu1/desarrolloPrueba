import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    nombre: {type: String, required: true },
    email: {type: String, required: true, unique: true},
    telefono: {type: String, required: true },
    tipo: {type: String, required: true },
    fecha_alta: {type: Date, default: new Date()}
}, {timestamps: true, collection: "Usuarios"})


export class Usuario {
    constructor(nombre, email, telefono, tipo) {
        this.nombre = nombre
        this.email = email
        this.telefono = telefono
        this.tipo = tipo
        this.fecha_alta = new Date()
    }
}

userSchema.loadClass(Usuario)
export const UserModel = mongoose.model("Usuario", userSchema)