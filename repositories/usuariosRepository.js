import {Repository} from "./repository.js";
import {UserModel} from "../models/entities/usuario.js";


class UsuariosRepository extends Repository {
    constructor() {
        super(UserModel);
    }
}

export default UsuariosRepository