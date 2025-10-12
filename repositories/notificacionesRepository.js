import {Repository} from "./repository.js";
import {NotificationModel} from "../models/entities/notificacion.js"


class NotificacionesRepository extends Repository {

    constructor() {
        super(NotificationModel);
    }

    findByUserId(filtros) {
        return this.model.find(filtros)
    }

    readNotification(notificationId) {
        return this.model.findById(notificationId)
            .then( notificacion=>{
                notificacion.marcarComoLeida()
                return notificacion.save()
            })
    }
}


export default NotificacionesRepository