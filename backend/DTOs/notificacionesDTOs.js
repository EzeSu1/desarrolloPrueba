class NotificacionesDTOs {
    notificacionToDTO(notificacion) {
        return {
            "id": notificacion._id,
            "usuario_id": notificacion.usuario_destino,
            "mensaje": notificacion.mensaje,
            "fecha_alta": notificacion.fecha_alta,
            "leida": notificacion.leida,
            "fecha_leida": notificacion.fecha_leida
        }
    }

    notificacionesToDTO(notificaciones) {
        return notificaciones.map(notificacion => this.notificacionToDTO(notificacion))
    }
}

export default new NotificacionesDTOs();