import {DireccionEntrega} from "../models/entities/direccionEntrega.js"


class DireccionesMapper {
    map(nuevaDireccionJSON) {
        return new DireccionEntrega(nuevaDireccionJSON.calle, nuevaDireccionJSON.altura, nuevaDireccionJSON.piso, nuevaDireccionJSON.departamento, nuevaDireccionJSON.codigo_postal, nuevaDireccionJSON.ciudad, nuevaDireccionJSON.provincia, nuevaDireccionJSON.pais, nuevaDireccionJSON.latitud, nuevaDireccionJSON.longitud)
    }
}

export default new DireccionesMapper();