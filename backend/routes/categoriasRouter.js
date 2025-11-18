import CategoriasController from "../controllers/categoriasController.js"
import express from "express";
import {errorHandler} from "../middlewares/errorHandler.js"


const router = express.Router()



router.route("/")
    .get(CategoriasController.obtenerCategorias)


router.use(errorHandler)

export default router