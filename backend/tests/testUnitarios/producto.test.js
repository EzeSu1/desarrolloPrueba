import {beforeEach, describe, expect, test} from '@jest/globals';
const {Producto} = require("../../models/entities/producto.js");


describe('Producto', () => {

    let producto;
    beforeEach(() => {
        producto = new Producto(1, 'Manzana', 'Fruta fresca', ['Fruta'], 10.5, 'PESO_ARG', 4, ['foto1.jpg']);
    })

    test('debería crear un producto con los datos correctos', () => {
        expect(producto.titulo).toBe('Manzana');
        expect(producto.descripcion).toBe('Fruta fresca');
        expect(producto.categorias).toEqual(['Fruta']);
        expect(producto.precio).toBe(10.5);
        expect(producto.moneda).toBe('PESO_ARG');
        expect(producto.stock).toBe(4);
        expect(producto.activo).toBe(true);
    });

    test('debería modificar el precio', () => {
      producto.modificarPrecio(15.0);
      expect(producto.precio).toBe(15.0);
    });

    test('debería cambiar el estado activo', () => {
      producto.setActivo(false);
      expect(producto.activo).toBe(false);
    });

    test('debería verificar disponibilidad cuando hay stock y está activo', () => {
      expect(producto.estaDisponible(3)).toBe(true);
    });

    test('debería verificar disponibilidad cuando no hay stock y está activo', () => {
        expect(producto.hayStock(6)).toBe(false);
        expect(producto.estaDisponible(6)).toBe(false);
    });

    test('debería verificar disponibilidad cuando hay stock y no está activo', () => {
        expect(producto.hayStock(3)).toBe(true);
        producto.setActivo(false);
        expect(producto.activo).toBe(false);
        expect(producto.estaDisponible(3)).toBe(false);
    });

    test('debería verificar disponibilidad cuando no hay stock y no esta activo', () => {
        expect(producto.hayStock(6)).toBe(false);
        producto.setActivo(false);
        expect(producto.activo).toBe(false);
        expect(producto.estaDisponible(6)).toBe(false);
    });

    test('debería reducir el stock', () => {
      producto.reducirStock(2);
      expect(producto.stock).toBe(2);
    });

    test('debería aumentar el stock', () => {
        producto.aumentarStock(5);
        expect(producto.stock).toBe(9);
    });

    test('debería estar activo por defecto', () => {
        expect(producto.activo).toBe(true);
    });
});


