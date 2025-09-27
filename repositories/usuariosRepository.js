
import UsuariosMapper from "../mappers/usuariosMapper.js";
import {Repository} from "./repository.js";

class UsuariosRepository extends Repository{
    constructor() {
        super("usuarios.json" ,(data) => UsuariosMapper.mapToUsuariosObject(data));
    }


}



export default UsuariosRepository


