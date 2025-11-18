import {NotificacionesDoesNotExist} from "../../errors/NotificacionesDoesNotExist.js";


class NotificacionesValidator {

    validarNotificaciones(notificaciones) {
        return notificaciones.map(notificacion => this.validarNotificacion(notificacion))
    }

    validarNotificacion(notificacion) {
        if (!notificacion) {
            throw new NotificacionesDoesNotExist()
        }

        return notificacion
    }

}


export default new NotificacionesValidator()