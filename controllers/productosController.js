import ProductoService from "../services/productoService.js";
import {  productoSchema2, idTransform } from "./validadores.js"  //idTransform falta importarlo,

class ProductosController {
    constructor() {
        this.productosService = ProductoService;
    }

    obtenerProducto(req, res) {
        const resultId = idTransform.safeParse(req.params.id)

        if(resultId.error) {
            res.status(400).json(resultId.error.issues)
            return
        }

        const id = resultId.data
        const producto = this.productosService.obtenerProducto(id);

        if(!producto) {
            res.status(404).json({ error: "Producto no encontrado con ese ID" })
            return
        }

        res.status(200).json(producto)
    }



    crearProducto(req, res) {
        const body = req.body
        const resultBody = productoSchema2.safeParse(body)

        if(!resultBody.success) {
            const errores = resultBody.error.issues.map(e => ({
                path: e.path.join("."),
                message: e.message
            }));
            res.status(400).json({ errores })
            return
        }

        const productoCreado = this.productosService.crearProducto(resultBody.data);

        if(!productoCreado) {
            res.status(500).json({ error: "Error al crear el producto" })
            return
        }

        res.status(201).json(productoCreado)
    }

}

export default new ProductosController();