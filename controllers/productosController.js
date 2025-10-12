import ProductosService from "../services/productosService.js";
import { showBodyErrors, validarIdParam } from "./validadores.js"
import { productoSchema } from "./schemas/productoSchema.js";
import ProductosDTOs from "../DTOs/productosDTO.js";



class ProductosController {

    obtenerProducto(req, res) {
        const producto_id = validarIdParam(req, res)

        return ProductosService.obtenerProducto(producto_id)
            .then(productoBuscado => res.status(200).json(ProductosDTOs.productoToDTO(productoBuscado)))
    }

    obtenerProductosPaginado(req, res) {
        return ProductosService.obtenerProductosPaginado(req.page, req.filters, req.sort)
            .then(productos => res.status(200).json(ProductosDTOs.productosToDTO(productos)))
    }

    crearProducto(req, res) {
        const body = req.body
        const result_body = productoSchema.safeParse(body)

        if (!result_body.success) {
            return showBodyErrors(req, res, result_body)
        }

        return ProductosService.crearProducto(result_body.data)
            .then(producto_creado => res.status(201).json(ProductosDTOs.productoToDTO(producto_creado)))
    }
}


export default new ProductosController();