
import {LoginUser} from "../models/entities/loginUser.js";


class LoginUsersMapper {

    map(cuentaJson, password) {
        console.log(cuentaJson);
        const newcuentaJson = {

            id: cuentaJson._id,
            nombre: cuentaJson.nombre,
            email: cuentaJson.email,
            telefono: cuentaJson.telefono,
            tipo: cuentaJson.tipo,

        };
        return new LoginUser(newcuentaJson, password)
    }
}

export default new LoginUsersMapper()