import {describe, expect, test} from '@jest/globals';

import {ItemPedido} from "../models/entities/itemPedido.js";
import {Categoria} from "../models/entities/categoria.js";
import {DireccionEntrega} from "../models/entities/direccionEntrega.js";
import {Moneda} from "../models/enums/moneda.js";

const {Usuario} = require("../models/entities/usuario.js");
const {Producto} = require("../models/entities/producto.js");
const {Pedido} = require("../models/entities/pedido.js");


describe('Test para pedidos', () => {
    // Usuarios //
    const usuario_vendedor = new Usuario("Ignacio Jubila", "ijubila@example.com", 1122334455, "VENDEDOR")
    const usuario_comprador = new Usuario("Juan Perez", "jperez@example.com", 6677889910, "COMPRADOR")

    // Producto //
    const categoria_ropa = new Categoria("ropa")
    const categoria_hombre = new Categoria("nombre")
    const producto_uno = new Producto(usuario_vendedor, "Camiseta de algodón", "Camiseta 100% algodón, color negro", [categoria_ropa, categoria_hombre], 2500, "PESO_ARG", 50, "foto1.jpg")
    const item_producto_uno = new ItemPedido(producto_uno, 25, producto_uno.getPrecio())
    const item_producto_dos = new ItemPedido(producto_uno, 900, producto_uno.getPrecio())

    // Pedido //
    // const productoSinStock = new Producto(Usuario, "Sin stock", "una decripcion", catP2 , 400, moneda.PESO_ARG, 0, "una foto");
    const direccion_uno = new DireccionEntrega(usuario_comprador, "Av. Siempre Viva", 123, 4, "B", "1234", "Springfield", "Buenos Aires", "Argentina", -34.6037, -58.3816)
    const pedido = new Pedido(usuario_comprador, [item_producto_uno],"PESO_ARG", direccion_uno)

    test('No se permite crear pedido cuando hay items que no tengan stock',() => {
        const productoSinStock = new Producto(Usuario, "Cocacola", "una decripcion", categoria_ropa , 400, Moneda.PESO_ARG, 0, "una foto");
        const itemPedidoSinStock = new ItemPedido(productoSinStock, 20)

        expect(() => {
            new Pedido(usuario_comprador, [itemPedidoSinStock], "PESO_ARG", direccion_uno);
        }).toThrow("No se puede crear este pedido. No hay stock disponible para estos productos: ");
    })

    test('Calcular total de un pedido', () => {
        expect(pedido.calcularTotal()).toBe(62500)
    })


})