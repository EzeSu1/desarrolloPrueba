import ProductsView from "./productsView";


const DestacadoDetail = () => {
    const filtros = {}

    return <ProductsView titulo="Todos los productos destacados" filtros={filtros} />
}

export default DestacadoDetail;