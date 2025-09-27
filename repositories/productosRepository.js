import path from "node:path";
import fs from "node:fs/promises";

import ProductosMapper from "../mappers/productosMapper.js";
import {Repository} from "./repository.js";


class ProductosRepository  extends Repository{
    constructor() {
        super("productos.json" ,(data) => ProductosMapper.mapToProductosObject(data));
    }


}


export default ProductosRepository