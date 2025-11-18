import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL


export const crearUsuario = (nombre, email, telefono, tipo, contraseña) => {
    const usuarioPayload = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        tipo: tipo
    }

    return axios
        .post(`${API_BASE_URL}/registrar`, usuarioPayload)
        .then((res) => res.data)
        .catch((err) => {
            console.error("Error al registrar el usuario: ", err)
            return [];
        })
}

export const desloguear=()=>{

    return axios
        .post(`${API_BASE_URL}/logout`)
        .then((res) => res.data)
        .catch((err) => {
            console.error("Error al desloguear el usuario: ", err)
            return [];
        })

}


/*
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
*/


