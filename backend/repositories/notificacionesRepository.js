import {Repository} from "./repository.js";
import {NotificationModel} from "../models/entities/notificacion.js"


class NotificacionesRepository extends Repository {
    constructor() {
        super(NotificationModel);
    }

    readNotification(notificationId) {
        return this.model.findById(notificationId)
            .then( notificacion => {
                notificacion.marcarComoLeida()
                return notificacion.save()
            })
    }
}

export default new NotificacionesRepository()