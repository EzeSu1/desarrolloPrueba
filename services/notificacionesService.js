import NotificacionesRepository from "../repositories/notificacionesRepository.js";
import FactoryNotificacion from "../models/entities/factoryNotificacion.js"
import NotificacionValidator from "./validators/NotificacionValidator.js";

class NotificacionesService{
    constructor() {
        this.notificacionesRepository = new NotificacionesRepository()
    }

    crearNotificacion(pedido){
        const nueva_notificacion = FactoryNotificacion.crearSegunPedido(pedido)
        this.notificacionesRepository.save(nueva_notificacion)
    }

    obtenerNotificaciones(filtros) {
        return this.notificacionesRepository.findByUserId(filtros)
    }

    leerNotificacion(notificacion_id) {
        return this.notificacionesRepository.readNotification(notificacion_id)
            .then(notificacion => NotificacionValidator.validarNotificacion(notificacion))
    }
}


export default new NotificacionesService()