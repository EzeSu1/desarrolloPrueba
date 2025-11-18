import CategoriasService from "../services/categoriasService.js";
import categoriasDTOs from "../DTOs/categoriasDTOs.js";


class CategoriasController {
    obtenerCategorias(req, res) {
        const categorias = CategoriasService.obtenerCategorias()

        return res.status(200).json(categoriasDTOs.categoriasToDTO(categorias))
    }
}

export default new CategoriasController();