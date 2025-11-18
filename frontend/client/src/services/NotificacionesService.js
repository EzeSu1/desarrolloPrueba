import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL


export const obtenerNotificaciones = (id, filtros) => {
    return axios
        .get(`${API_BASE_URL}/usuarios/${id}/notificaciones?${filtros}`)
        .then((res) => res.data)
        .catch((err) => {
            console.error("Error al obtener el producto:", err)
            return [];
        })
}

export const marcarComoLeida = (id) => {
    console.log(id)
    return axios
        .post(`${API_BASE_URL}/notificaciones/${id}/leerNotificacion`)
        .then((res) => res.data)
        .catch((err) => {
            console.error("Error al leer la notifiacion:", err)
            return [];
        })
}