import NotificacionesRepository from "../repositories/notificacionesRepository.js";
import FactoryNotificacion from "../models/entities/factoryNotificacion.js"
import NotificacionValidator from "./validators/notificacionesValidator.js";

class NotificacionesService {
    crearNotificacion(pedido,vendedor){
        const nueva_notificacion = FactoryNotificacion.crearSegunPedido(pedido,vendedor)
        NotificacionesRepository.save(nueva_notificacion)
    }

    obtenerNotificaciones(filtros) {
        return NotificacionesRepository.findBy(filtros)
    }

    leerNotificacion(notificacion_id) {
        return NotificacionesRepository.readNotification(notificacion_id)
            .then(notificacion => NotificacionValidator.validarNotificacion(notificacion))
    }
}


export default new NotificacionesService()