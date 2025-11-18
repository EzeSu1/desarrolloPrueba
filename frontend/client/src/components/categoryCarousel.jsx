import CategoryItem from "./categoryItem"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "./nextArrow";
import PrevArrow from "./prevArrow";
import {Box, CircularProgress} from "@mui/material";
import {useCategorias} from "../hooks/useCategorias";


export function CategoryCarousel() {
    const { data: categorias, isLoading } = useCategorias();
    const settings = {
        dots: true,             // muestra los puntitos de navegación
        infinite: true,         // loop infinito
        speed: 500,             // duración de la animación (ms)
        autoplay: true,         // reproducción automática
        autoplaySpeed: 2500,    // cada cuántos ms pasa al siguiente
        centerMode: true,       // muestra la siguiente y anterior vinieta por los costados
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }

    if(isLoading) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", aspectRatio: 25/6}}>
                <CircularProgress color="primary" size={60}/>
            </Box>
        )
    }

    return (
        <Box sx={{width: "100%"}}>
            <Slider {...settings}>
                {categorias.map(categoria => <CategoryItem categoria={categoria} />)}
            </Slider>
        </Box>
    )
}

export default CategoryCarousel;