class NotificacionesRepository {
    constructor() {
        this.notificaciones = []
        this.ultimo_id = 1;
    }

    save(notificacion) {
        notificacion.id = this.ultimo_id++;
        this.notificaciones.push(notificacion)
        return notificacion
    }
}

export default NotificacionesRepository