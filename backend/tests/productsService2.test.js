import ProductosService from "../services/productosService.js";
import ProductosRepository from "../repositories/productosRepository.js";
import ProductosValidator from "../services/validators/productosValidator.js";
import UsuariosService from "../services/usuariosService.js";
import UsuariosValidator from "../services/validators/usuariosValidator.js";
import CategoriasService from "../services/categoriasService.js";
import CategoriasValidator from "../services/validators/categoriasValidator.js";
import ProductosMapper from "../mappers/productosMapper.js";
import {describe, expect, jest, test} from "@jest/globals";

jest.mock("../repositories/productosRepository.js");
jest.mock("../services/validators/productosValidator.js");
jest.mock("../services/usuariosService.js");
jest.mock("../services/validators/usuariosValidator.js");
jest.mock("../services/categoriasService.js");
jest.mock("../services/validators/categoriasValidator.js");
jest.mock("../mappers/productosMapper.js");



describe("ProductosService con .then()", () => {
    test("obtenerProducto devuelve el producto validado", () => {

        const productoMock = { id: "123" };
        const productoValidadoMock = { id: "123", validado: true };

        ProductosRepository.findById.mockResolvedValue(productoMock);
        ProductosValidator.validarProducto.mockReturnValue(productoValidadoMock);

        return ProductosService.obtenerProducto("123")
            .then(resultado => {
                expect(ProductosRepository.findById).toHaveBeenCalledWith("123");
                expect(ProductosValidator.validarProducto).toHaveBeenCalledWith(productoMock);
                expect(resultado).toEqual(productoValidadoMock);
            });
    });

    test("obtenerProductosPaginado devuelve productos validados", () => {

        const productosMock = [{}, {}];
        const productosValidadosMock = [{ok: true}, {ok: true}];

        ProductosRepository.findbyPage.mockResolvedValue(productosMock);
        ProductosValidator.validarProductos.mockReturnValue(productosValidadosMock);

        return ProductosService
            .obtenerProductosPaginado(1, { filtro: "x" }, { precio: -1 })
            .then(resultado => {

                expect(ProductosRepository.findbyPage)
                    .toHaveBeenCalledWith(1, { filtro: "x" }, { precio: -1 });

                expect(ProductosValidator.validarProductos)
                    .toHaveBeenCalledWith(productosMock);

                expect(resultado).toEqual(productosValidadosMock);
            });
    });

    test("crearProducto ejecuta todo el flujo y guarda el producto", () => {

        const body = {
            vendedorId: "v123",
            titulo: "X",
            categorias: [{ nombre: "cat1" }, { nombre: "cat2" }]
        };

        const vendedorMock = { id: "v123" };
        const productoMapeado = { titulo: "X" };
        const productoGuardado = { titulo: "X", saved: true };

        UsuariosService.obtenerUsuario.mockResolvedValue(vendedorMock);
        UsuariosValidator.validarVendedor.mockReturnValue(true);

        CategoriasService.obtenerCategoria.mockResolvedValue({ id: "cat" });

        CategoriasValidator.validarUnicidad.mockReturnValue(true);

        ProductosMapper.map.mockReturnValue(productoMapeado);
        ProductosRepository.save.mockResolvedValue(productoGuardado);

        return ProductosService.crearProducto(body)
            .then(resultado => {

                expect(UsuariosService.obtenerUsuario)
                    .toHaveBeenCalledWith("v123");

                expect(UsuariosValidator.validarVendedor)
                    .toHaveBeenCalledWith(vendedorMock);

                expect(CategoriasService.obtenerCategoria).toHaveBeenCalledTimes(2);

                expect(CategoriasValidator.validarUnicidad)
                    .toHaveBeenCalledWith(body.categorias);

                expect(ProductosMapper.map)
                    .toHaveBeenCalledWith(body, vendedorMock, body.categorias);

                expect(ProductosRepository.save)
                    .toHaveBeenCalledWith(productoMapeado);

                expect(resultado).toEqual(productoGuardado);
            });
    });

});