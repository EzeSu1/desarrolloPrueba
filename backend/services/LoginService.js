
import UsuariosService from "./usuariosService.js";
import LoginRepository from "../repositories/loginRepository.js";
import LoginUsersMapper from "../mappers/loginUsersMapper.js";
import LoginUserValidator from "./validators/loginUserValidator.js";
import bcrypt from "bcrypt";

const salt = 10;

class LoginService{
    crearUsuario(nueva_cuenta){
        return bcrypt.hash(nueva_cuenta.password, salt)
            .then(passwordHasheado => {
                nueva_cuenta.password = passwordHasheado;

                return UsuariosService.crearUsuario(nueva_cuenta.usuario)
                    .then(usuarioCreado=>{
                        console.log(usuarioCreado);
                        const nuevo_usuario = LoginUsersMapper.map(usuarioCreado, nueva_cuenta.password)
                        return LoginRepository.save(nuevo_usuario)
                    })
            });


    }

    verificarLogueo(cuentaEntrante){
        return LoginRepository.findByUser(cuentaEntrante.user)
            .then(usuarioLogueado => {

                if (!usuarioLogueado) {
                    throw new Error("Credenciales inválidas (usuario no encontrado)."); //TODO
                }
                // bcrypt.compare() devuelve true ofalse
                return bcrypt.compare(cuentaEntrante.password, usuarioLogueado.password)
                    .then(matcheo => {
                        if (!matcheo) {
                            throw new Error("Credenciales inválidas (contraseña incorrecta)."); //TODO
                        }
                        return LoginUserValidator.validarCuenta(usuarioLogueado);
                    });
            });
    }


}


export default new LoginService()