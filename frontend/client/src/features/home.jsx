import CategoryCarousel from "../components/categoryCarousel";
import ProductsCarousel from "../components/productsCarousel";
import {useProductos} from "../hooks/useProductos";
import {Stack} from "@mui/material";

const Home = () => {
    const { productos } = useProductos()
    return(
        <Stack sx={{gap: "5rem", alignItems: "center"}}>
            <CategoryCarousel />
            <ProductsCarousel title="Productos destacados" viewMoreLink="/destacados" productos={productos} loop={true}/>
        </Stack>
    )
}

export default Home;