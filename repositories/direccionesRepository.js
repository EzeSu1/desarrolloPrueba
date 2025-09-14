class DireccionesRepository {
    constructor() {
        this.direcciones = []
        this.ultimo_id = 1
    }

    findById(id) {
        return this.direcciones.find(direccion => direccion.id === id)
    }

    save(direccionEntrega) {
        direccionEntrega.id = this.ultimo_id++
        this.direcciones.push(direccionEntrega)
        return direccionEntrega
    }

    deleteById(id) {
        const index = this.direcciones.findIndex(direccion => direccion.id === id)
        if (index !== -1) {
            const direccionEliminada = this.direcciones.splice(index, 1)[0]
            return direccionEliminada
        }
        return null
    }

    replace(nuevaDireccion, idDireccion) {
        nuevaDireccion.id = idDireccion
        this.direcciones[idDireccion] = nuevaDireccion
        return nuevaDireccion
    }
}

export default DireccionesRepository