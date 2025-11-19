import axios from 'axios';
const API_BASE_URL ="https://mi-tienda-sol.onrender.com"//process.env.REACT_APP_API_URL


export const getProductos = (filtros = {}) => {
    const params = new URLSearchParams(filtros).toString()
    const query = params ? `?${params}` : ""
    console.log(query)
    return axios
        .get(`${API_BASE_URL}/productos${query}`)
        .then((res) => res.data)
        .catch((err) => {
            console.error("Error al obtener el producto:", err)
            return [];
        })
}

export const getProductoById = (id) => {
    return axios.get(API_BASE_URL + `/productos/${id}`)
        .then((res) => res.data)
        .catch((err) => {
            console.error("Error al obtener el producto:", err)
            return [];
        })
}

export const getProductosVendedor = (idVendedor, filtros) => {
    return axios.get(API_BASE_URL + `/usuarios/${idVendedor}/productos?${filtros}`)
        .then((res) => res.data)
        .catch((err) => {
            console.error("Error al obtener los productos del vendedor:", err);
            return [];
        });
}

export const agregarStock = (productoId, cantidad) => {
    return axios.post(API_BASE_URL + `/productos/${productoId}/agregarStock`, { cantidad: Number(cantidad) })
        .then((res) => res.data)
        .catch((err) => {
            console.error("Error al agregar stock al producto:", err);
            return [];
        });
}

export const getPaginasTotales = () => {
    return axios.get(API_BASE_URL + `/productos/paginasTotales`)
        .then((res) => res.data)
        .catch((err) => {
            console.error("Error al obtener la cantidad de paginas:", err);
            return [];
        });
}

export const postProducto = (vendedorId, producto) => {

    const productoPayload = {
        vendedorId,
        titulo: producto.titulo,
        descripcion: producto.descripcion,

        categorias: Array.isArray(producto.cat)
            ? producto.cat.map(c => ({ nombre: c.nombre }))
            : [],

        precio: Number(producto.precio),
        moneda: producto.moneda,
        stock: Number(producto.stock),

        fotos: Array.isArray(producto.fot) ? producto.fot : [],
        activo: true
    };

    console.log("PAYLOAD ENVIADO:", productoPayload);

    return axios
        .post(API_BASE_URL + `/productos`, productoPayload)
        .then(res => res.data)
        .catch(err => {
            console.error("Error al crear producto:", err)
            return [];
        });
};





export const armarPedido = (userId, cartItems, addressData) => {


    const itemsPayload = cartItems.map(item => ({
        productoId: item.id,
        cantidad: item.quantity,
    }));


    const direccionEntregaPayload = {
        calle: addressData.calle,
        altura: Number(addressData.altura),
        piso: Number(addressData.piso) || null,
        departamento: addressData.departamento || null,
        codigo_postal: addressData.codigoPostal,
        ciudad: addressData.ciudad,
        provincia: addressData.provincia,
        pais: addressData.pais,
        latitud: addressData.latitud ? Number(addressData.latitud) : undefined,
        longitud: addressData.longitud ? Number(addressData.longitud) : undefined,
    };



    const pedidoPayload = {
        compradorId: userId,
        items: itemsPayload,
        moneda: "PESO_ARG", //TODO
        direccionEntrega: direccionEntregaPayload,
    };

    console.log("Payload enviado:", pedidoPayload);
    return axios.post(API_BASE_URL + `/pedidos`, pedidoPayload)
        .then((res) => res.data)
        .catch((err) => {
            console.error("Fallo al crear el pedido:", err);
            throw err;
        });

}