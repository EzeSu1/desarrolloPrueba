import ProductosService from "../services/productosService.js";
import ProductosRepository from "../repositories/productosRepository.js";
import UsuariosService from "../services/usuariosService.js";
import ProductosValidator from "../services/validators/productosValidator.js";
import UsuariosValidator from "../services/validators/usuariosValidator.js";
import ProductosMapper from "../mappers/productosMapper.js";
import CategoriaMapper from "../mappers/categoriasMapper.js";
import {beforeEach, describe, expect, jest, test} from "@jest/globals";

jest.mock("../repositories/productosRepository.js")
jest.mock("../services/usuariosService.js");
jest.mock("../services/validators/productosValidator.js");
jest.mock("../services/validators/usuariosValidator.js");
jest.mock("../mappers/productosMapper.js");
jest.mock("../mappers/categoriasMapper.js");
describe("ProductosService", ()=>{
    let mockRepoProducto
    beforeEach(()=>{
        jest.clearAllMocks();
        mockRepoProducto={
            findById : jest.fn(),
            save : jest.fn(),
            findByPage : jest.fn()

        }
        ProductosRepository.mockImplementation(() => mockRepoProducto)
        ProductosService.productosRepository = mockRepoProducto

    
    })
    
    test("crearProducto ", () => {
        const nuevoProductoJson = {
            vendedorId: "68e179db83b5fdd20617afb2",
            titulo: "plato ",
            descripcion: "ceramica",
            categorias: [
            { nombre: "cocina" },
            { nombre: "decoracion" }
            ],
            precio: 130,
            moneda: "PESO_ARG",
            stock: 50,
            fotos: ["foto1.jpg"],
            activo: true
        };

        const vendedorMock = { id: "68e179db83b5fdd20617afb2", nombre: "Juan Perez", email: "juan.perez@example.com",telefono: "1122334455", tipo: "VENDEDOR", fecha_alta: "2025-09-20T13:33:04.302Z"};
        const categoriasMock = [
            { nombre: "cocina" },
            { nombre: "decoracion" }
        ];
        const productoMappedMock = {
            id: 1,
            vendedor: "68e179db83b5fdd20617afb2",
            titulo: "plato ",
            descripcion: "ceramica",
            categorias: categoriasMock,
            precio: 130,
            moneda: "PESO_ARG",
            stock: 50,
            fotos: ["foto1.jpg"],
            activo: true
        };

        UsuariosService.obtenerUsuario.mockResolvedValue(vendedorMock);
        UsuariosValidator.validarVendedor.mockReturnValue(vendedorMock);
        CategoriaMapper.map.mockReturnValue(categoriasMock);
        ProductosMapper.map.mockReturnValue(productoMappedMock);
        mockRepoProducto.save.mockResolvedValue(productoMappedMock);

        return ProductosService.crearProducto(nuevoProductoJson)
            .then((productoCreado)=>{
                expect(UsuariosService.obtenerUsuario).toHaveBeenCalledWith("68e179db83b5fdd20617afb2");
                expect(UsuariosValidator.validarVendedor).toHaveBeenCalledWith(vendedorMock);
                expect(CategoriaMapper.map).toHaveBeenCalledWith(nuevoProductoJson.categorias);
                expect(ProductosMapper.map).toHaveBeenCalledWith(
                  nuevoProductoJson,
                    vendedorMock,
                    categoriasMock
                );
                expect(mockRepoProducto.save).toHaveBeenCalledWith(productoMappedMock);
                expect(productoCreado).toEqual(productoMappedMock);
            })

    });
    test("Obtener un producto por id", () => {
        const productoMock = {"id":1,"vendedor":{"id":1,"nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"VENDEDOR","fecha_alta":"2025-09-20T13:33:06.458Z"},"titulo":"Camiseta de algodón","descripcion":"Camiseta 100% algodón, color negro","categorias":[{"nombre":"ropa"},{"nombre":"hombre"}],"precio":2500,"moneda":"PESO_ARG","stock":50,"fotos":["foto1.jpg"],"activo":true}

        mockRepoProducto.findById.mockResolvedValue(productoMock);
        ProductosValidator.validarProducto.mockReturnValue(productoMock);
        return ProductosService.obtenerProducto(1)
            .then((producto) => {
                expect(mockRepoProducto.findById).toHaveBeenCalledWith(1);
                expect(mockRepoProducto.findById).toHaveBeenCalledTimes(1)
                expect(ProductosValidator.validarProducto).toHaveBeenCalledWith(productoMock);
                expect(producto).toEqual({"id":1,"vendedor":{"id":1,"nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"VENDEDOR","fecha_alta":"2025-09-20T13:33:06.458Z"},"titulo":"Camiseta de algodón","descripcion":"Camiseta 100% algodón, color negro","categorias":[{"nombre":"ropa"},{"nombre":"hombre"}],"precio":2500,"moneda":"PESO_ARG","stock":50,"fotos":["foto1.jpg"],"activo":true});
            });
    });

    test("obtenerProductosPaginado", async () => {
        const productosMock = [{"id":1,"vendedor":{"id":"68ded117d383dd820ee1efb2","nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"VENDEDOR","fecha_alta":"2025-09-20T13:33:06.458Z"},"titulo":"Camiseta de algodón","descripcion":"Camiseta 100% algodón, color negro","categorias":[{"nombre":"ropa"},{"nombre":"hombre"}],"precio":2500,"moneda":"PESO_ARG","stock":50,"fotos":["foto1.jpg"],"activo":true},
                               {"id":2,"vendedor":{"id":"68ded117d383dd820ee1efb2","nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"VENDEDOR","fecha_alta":"2025-09-20T13:33:06.458Z"},"titulo":"Camiseta de algodón","descripcion":"Camiseta 100% algodón, color negro","categorias":[{"nombre":"ropa"},{"nombre":"hombre"}],"precio":2500,"moneda":"PESO_ARG","stock":50,"fotos":["foto1.jpg"],"activo":true},
                               {"id":3,"vendedor":{"id":"68ded117d383dd820ee1efb2","nombre":"Juan Perez","email":"juan.perez@example.com","telefono":"1122334455","tipo":"VENDEDOR","fecha_alta":"2025-09-20T13:33:06.458Z"},"titulo":"Camiseta de algodón","descripcion":"Camiseta 100% algodón, color negro","categorias":[{"nombre":"ropa"},{"nombre":"hombre"}],"precio":2500,"moneda":"PESO_ARG","stock":50,"fotos":["foto1.jpg"],"activo":true}
                              ];
        mockRepoProducto.findByPage.mockResolvedValue(productosMock);
        return  mockRepoProducto.findByPage(1, {}, {})
            .then((productos)=>{
                expect(mockRepoProducto.findByPage).toHaveBeenCalledWith(1, {}, {});
                expect(mockRepoProducto.findByPage).toHaveBeenCalledTimes(1);
                expect(productos).toEqual(productosMock);
            })
    });
    

})