// tests/testUnitarios/pedidos.test.js
import {beforeEach, describe, expect, test} from '@jest/globals';
import {Usuario} from "../../models/entities/usuario.js";
import {Producto} from "../../models/entities/producto.js";
import {DireccionEntrega} from "../../models/entities/direccionEntrega.js";
import {ItemPedido} from "../../models/entities/itemPedido.js";
const {Pedido} = require("../../models/entities/pedido.js");

describe('Pedido', () => {
    let vendedor1, comprador1, direccion1, direccion2, producto1, producto2, itemPedido1, itemPedido2, itemsPedidos,pedido1;

    beforeEach(() => {
        vendedor1 = new Usuario('Juan', 'jperez@mail.com', 1122334455, 'VENDEDOR');
        comprador1 = new Usuario('Hernando', 'hernanapa@hotmail.com', 1134332345, 'COMPRADOR');
        direccion1 = new DireccionEntrega("Calle Falsa 123", 1232, 2, "E", 1188, "Ciudad", "Provincia", "País", 123232112, -23232312);
        direccion2 = new DireccionEntrega("Calle Falsa 123", 2, 3,'A', 1188, "Ciudad", "Provincia", "País", 123232112, -23232312);
        producto1 = new Producto(vendedor1, "Remera playera", "Es una remera playera", ["Remera", "Playa"], 12231, "PESO_ARG", 12, ["foto jpg fachera facherita"]);
        producto2 = new Producto(vendedor1, "Pantalon corto", "Es un pantalon corto", ["Pantalon", "Verano"], 2231, "PESO_ARG", 5, ["foto jpg fachera no facherita"]);
        itemPedido1 = new ItemPedido(producto1, 10);
        itemPedido2 = new ItemPedido(producto2, 2);
        itemsPedidos = [itemPedido1, itemPedido2];
        pedido1 = new Pedido(comprador1, itemsPedidos, 'PESO_ARG', direccion1);
    });

    test('debería crear el pedido correctamente', () => {
        expect(pedido1.items.length).toBe(2)
        expect(pedido1.total).toBe(2*2231 + 10*12231)
        expect(pedido1.estado).toBe('PENDIENTE')
        expect(pedido1.historial_estados.length).toBe(1)
        expect(pedido1.historial_estados[0].estado).toBe('PENDIENTE')
    });

    test('debería cambiar el estado del pedido y tener dos estados en el historial', () => {
        pedido1.actualizarEstado('CONFIRMADO', comprador1, "Confirmacion del pedido");
        expect(pedido1.estado).toBe('CONFIRMADO');
        expect(pedido1.historial_estados.length).toBe(2);
    });

    test('deberia exponer el vendedor correctamente', () => {
        expect(pedido1.obtenerVendedor()).toBe(vendedor1)
    })
});







