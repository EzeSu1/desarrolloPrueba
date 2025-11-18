import { useSearchParams } from 'react-router-dom';
import ProductsView from "./productsView";


const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();

const query = {
        titulo: searchParams.get("titulo"),
        categorias: searchParams.get("categorias"),
    }
    return (
        <ProductsView
            titulo={query ? `Resultados para "${query}"` : "Todos los productos"}
            filtros={query ? { titulo: query.titulo, categorias: query.categorias } :  {}}
        />
    )
}

export default SearchResultsPage;