import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_URL

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const getCategorias = () => {
    return delay(2000)
        .then(r => axios
            .get(`${API_BASE_URL}/categorias`)
            .then((res) => res.data)
            .catch((err) => {
                console.error("Error al obtener las categorias:", err)
                return [];
            }))
}
