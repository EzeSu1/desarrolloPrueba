import React from "react";
import Button from "@mui/material/Button";
import {Box, CircularProgress, Menu, MenuItem} from "@mui/material";
import {useCategorias} from "../hooks/useCategorias";
import {usePanel} from "../hooks/usePanel";

const CategorySection = () => {
    const {data: categorias, isLoading} = useCategorias();
    const {openPanel, closePanel, navigateTo, panelOpen, anchorElement} = usePanel()

    const navigateToCategory = (categoria)=> () => {
        const query = encodeURIComponent(categoria.nombre)
        navigateTo(`/productos?categorias=${query}`)
    }

    return (
        <>
            <Button
                onClick={openPanel}
                aria-controls={panelOpen ? "categoria-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={panelOpen ? "true" : undefined}
                sx={{color: "inherit"}}
            >
                Categorias
            </Button>

            <Menu
                anchorEl={anchorElement}
                open={panelOpen}
                onClose={closePanel}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
            >
                {
                    isLoading ? (
                        <Box sx={{width: "7rem", aspectRatio: 2, display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <CircularProgress color="primary" size={30} sx={{width: "100%"}}/>
                        </Box>
                    ) : categorias.map(categoria => <MenuItem key={categoria.nombre} onClick={navigateToCategory(categoria)}>{categoria.nombre}</MenuItem>)
                }
            </Menu>
        </>
    );
}

export default CategorySection