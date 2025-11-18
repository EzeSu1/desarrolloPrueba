import ProductItem from "./productItem"
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Box, CircularProgress, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import NextArrow from "./nextArrow";
import PrevArrow from "./prevArrow";

const ProductsCarousel = ({title="", viewMoreLink="", productos=[]}) => {
    const settings = {
        infinite: true,        // loop infinito
        speed: 500,            // duración de la animación (ms)
        slidesToShow: 5,       // cuántos ítems se ven al mismo tiempo
        draggable: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive:[
            {
                breakpoint: 1745, // tablets
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1024, // tablets
                settings: {
                    slidesToShow: 3,
                },
            },

            {
                breakpoint: 768,
                settings:{
                    slidesToShow:2,
                }
            }

        ],
    }

    const isLoading = false

    if (productos.length !== 0) {
        return (
            <Stack sx={{width: "80vw"}}>
                <Box sx={{display: "flex", gap: "1rem", alignItems: "flex-end"}}>
                    <Typography variant="h5">{title}</Typography>
                    <Typography component={Link} to={isLoading ? "#" : viewMoreLink} style={{textDecoration: "none", color: isLoading ? "grey" : "#0048ff"}}>Ver más</Typography>
                </Box>
                <Box sx={{display: "block", width: "100%"}}>
                    {isLoading ?
                        (
                            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "23rem", border: "1px solid grey"}}>
                                <CircularProgress color="primary" size={60}/>
                            </Box>
                        ) : (
                            <Slider {...settings}>
                                {productos.map(producto => <ProductItem key={producto.id} producto={producto} />)}
                            </Slider>
                        )
                    }
                </Box>
            </Stack>
        )
    }
}

export default ProductsCarousel;