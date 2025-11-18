import {Link} from "react-router-dom";
import {AppBar, Button, Toolbar, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import React from "react";
import CategorySection from "./categorySection";


const TabBar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <AppBar position="static" color="#443f39" elevation={1}>
            <Toolbar sx={{ display: "flex", alignItems: "center", bgcolor: "#ffffff", listStyle: "none", gap: 2, justifyContent: "center", minHeight: "32px !important", }}>
                <CategorySection />
                <Button component={Link} to="/productos" color="inherit">Productos</Button>
                {!isMobile && <Button component={Link} to="/destacados" color="inherit">Destacados</Button>}
                <Button component={Link} to="/vender" color="inherit">Vender</Button>
                {!isMobile && <Button component={Link} to="/ayuda" color="inherit">Ayuda</Button>}

            </Toolbar>
        </AppBar>
    );
}

export default TabBar;