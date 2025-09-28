import NotificacionesRepository from "../repositories/notificacionesRepository.js";
import { FactoryNotificacion } from "../models/entities/factoryNotificacion.js";



class NotificacionesService{
    constructor() {
        this.notificacionesRepository = new NotificacionesRepository()
    }

    crearNotificacion(pedido){
        const factory_Notificacion = new FactoryNotificacion()
        const nueva_notificacion = factory_Notificacion.crearSegunPedido(pedido)
        this.notificacionesRepository.save(nueva_notificacion)
    }

    obtenerNotificaciones(usuario_id) {
        return this.notificacionesRepository.findByUserId(usuario_id)
            .then(notificaciones => notificaciones)
    }
    /*
    static instance() {
        if (!NotificacionesService.singleton) {
            NotificacionesService.singleton = new NotificacionesService();
        }
        return NotificacionesService.singleton;
    }*/
}


export default new NotificacionesService()