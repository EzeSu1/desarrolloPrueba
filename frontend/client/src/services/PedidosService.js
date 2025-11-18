import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_URL


export const getPedidosComprador = (idComprador) => {
    return axios
        .get(`${API_BASE_URL}/usuarios/${idComprador}/pedidos`)
        .then((res) => res.data)
        .catch((err) => {
            console.error("Error al obtener el producto:", err)
            return [];
        })
}

export const getPedido = (idPedido) => {
    return axios
        .get(`${API_BASE_URL}/pedidos/${idPedido}`)
        .then((res) => res.data)
        .catch((err) => {
            console.error("Error al obtener el producto:", err)
            return [];
        })
}

export const getPedidos = (filtros = {}) => {
    const params = new URLSearchParams(filtros).toString()
    const query = params ? `?${params}` : ""

    return axios
        .get(`${API_BASE_URL}/pedidos${query}`)
        .then((res) => res.data)
        .catch((err) => {
            console.error("Error al obtener el producto:", err)
            return [];
        })
}

export const patchEstadoPedido = (pedidoId, vendedorId, nuevoEstado, motivo) => {
    const cambioEstadoPayload = { usuarioId: vendedorId, estado: nuevoEstado, motivo: motivo }

    return axios
        .patch(`${API_BASE_URL}/pedidos/${pedidoId}`, cambioEstadoPayload)
        .then((res) => res.data)
        .catch((err) => {
            console.error("Error al actualizar el pedido:", err)
            return null
        })
}