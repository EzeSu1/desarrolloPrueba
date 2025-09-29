import {Repository} from "./repository.js";
import {UsuarioModel} from "../models/entities/usuario.js";


class UsuariosRepository extends Repository {
    constructor() {
        super(UsuarioModel);
    }


}


export default UsuariosRepository