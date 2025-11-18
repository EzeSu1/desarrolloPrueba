import mongoose from "mongoose";


const loginUserSchema = new mongoose.Schema({
    user: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true},
        nombre: {type: String, required: true },
        email: {type: String, required: true, unique: true},
        telefono: {type: String, required: true },
        tipo: {type: String, required: true },
        fecha_alta: {type: Date, default: new Date()},
   },
   password:{type: String, required: true},
}, { collection: "LoginUsers"})


export class LoginUser {
    constructor(usuario, password) {
        this.password = password
        this.user = usuario
    }
}







loginUserSchema.loadClass(LoginUser)
export const LoginUserModel = mongoose.model("LoginUser", loginUserSchema)
