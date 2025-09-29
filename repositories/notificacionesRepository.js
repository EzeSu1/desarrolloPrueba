
import {Repository} from "./repository.js";

import {NotificacionModel} from "../models/entities/notificacion.js";



class NotificacionesRepository extends Repository {

    constructor() {
        super(NotificacionModel);
    }

    findByUserId(userId) {
        return this.model.find({ usuario_destino: userId })

    }

}


export default NotificacionesRepository