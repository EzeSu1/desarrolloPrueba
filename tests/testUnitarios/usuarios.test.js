import {beforeEach, describe, expect, test} from '@jest/globals';
const {Usuario} = require("../../models/entities/usuario.js");


describe('Usuario', () => {
    let usuarioVendedor
    beforeEach(() => {
        usuarioVendedor = new Usuario('Juan', 'jperez@mail.com', 1122334455, 'VENDEDOR');
    })

    test('Debería crear un usuario correctamente', () => {
        expect(usuarioVendedor.nombre).toBe('Juan');
        expect(usuarioVendedor.email).toBe('jperez@mail.com');
        expect(usuarioVendedor.telefono).toBe(1122334455);
        expect(usuarioVendedor.tipo).toBe('VENDEDOR');
    });
});