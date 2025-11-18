import {NotificacionesDoesNotExist} from "../../errors/NotificacionesDoesNotExist.js";
import jwt from "jsonwebtoken";


class LoginUserValidator{
    validarCuenta(cuenta){
        if(!cuenta){
            throw new NotificacionesDoesNotExist() //TODO:
        }
        const user =cuenta.user
        const token = jwt.sign({user}, 'Stack', { expiresIn:'3m'});
        return token
    }
}

export default new LoginUserValidator()