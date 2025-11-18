export function queryParamsHandler(req, res, next) {
    req.page = parsePage(req)
    req.filters = parseFilters(req)
    req.sort = parseSort(req)

    next()
}

function parsePage(req) {
    const page = Math.max(1, Number(req.query.page))

    if (!page || page <= 0) {
        return { page: 1 }
    }

    return page
}

function parseFilters(req) {
    const filtros = {}

    if (req.query.min_price || req.query.max_price) {
        filtros.precio = {}

        if (req.query.min_price) {
            filtros.precio.$gte = Number(req.query.min_price)
        }

        if (req.query.max_price) {
            filtros.precio.$lte = Number(req.query.max_price)
        }
    }

    if (req.query.titulo) {
        filtros.titulo = { $regex: req.query.titulo, $options: "i" }
    }

    if (req.query.descripcion) {
        filtros.descripcion = { $regex: req.query.descripcion, $options: "i" }
    }

    if (req.query.categorias) {
        filtros["categorias.nombre"] = { $all: req.query.categorias.split(",").map(categoria => categoria.trim()) };
    }

    if (req.query.leida) {
        filtros.leida = req.query.leida === "true"
    }

    if (req.query.vendedor) {
        filtros.vendedor = req.query.vendedor
    }

    return filtros;
}

function parseSort(req) {
    const sortOptions = {
        precio_asc: { precio: 1 },
        precio_desc: { precio: -1 },
        most_sold: { cantidad_vendida: -1 },
    }

    return sortOptions[req.query.sort] ||  { fechaCreacion: 1 }
}