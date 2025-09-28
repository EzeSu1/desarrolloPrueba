import {Repository} from "./repository.js";
import UsuariosMapper from "../mappers/usuariosMapper.js";



class UsuariosRepository extends Repository {
    constructor() {
        super("usuarios.json",(data) => UsuariosMapper.mapToUsuariosObject(data));
    }
}


export default UsuariosRepository