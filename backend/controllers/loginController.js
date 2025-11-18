import {showBodyErrors} from "./validadores.js";
import {registrarSchema, loguearSchema} from "./schemas/registrarSchema.js";
import LoginService from "../services/LoginService.js";


class LoginController {

    loguear(req, res) {
        const body = req.body
        const result_body = loguearSchema.safeParse(body)

        if (!result_body.success) {
            return showBodyErrors(req, res, result_body)
        }

        return LoginService.verificarLogueo(result_body.data)
            .then(tokenGenerado=>res.status(200).json({token: tokenGenerado}))
            .catch(err => res.status(400).send(err.message))
    }

    registrar(req, res) {

        const body = req.body
        const result_body = registrarSchema.safeParse(body)

        if (!result_body.success) {
            return showBodyErrors(req, res, result_body)
        }

        return LoginService.crearUsuario(result_body.data)
            .then(usuarios => res.status(201).json(usuarios))
            .catch(err => res.status(400).json(err)) //TODO:
    }

    logout(req, res) {

        return res.status(200).json({
            message: "Sesión cerrada. El token debe ser eliminado en el cliente."
        });
    }
}


export default new LoginController();