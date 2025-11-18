import React from 'react';
import { Link } from "react-router-dom";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import NotificationSection from "./notificationSection";
import SearchBar from "./searchBar";
import MenuSection from "./menuSection";
import AccountSection from "./accountSection";
import SearchSection from "./searchSection";
import CartSection from "./cartSection";

const NavBar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            <AppBar position="static" elevation={1} sx={{ bgcolor: "navbar.bg", paddingY: {md: "1rem"}}}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: "1rem"}}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {isMobile && <MenuSection />}
                        <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: 'none' }}>
                            <LightModeRoundedIcon sx={{ height: 40, width: 40, color: "logo" }} />
                            {!isMedium && (
                                <Typography variant="h6" noWrap sx={{ color: "logo" }}>
                                    TIENDA SOL
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    {!isMobile && <SearchBar />}

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {isMobile && <SearchSection />}
                        <CartSection />
                        <NotificationSection />
                        {!isMobile && <AccountSection />}
                    </Box>
                </Toolbar>
            </AppBar>

            {/*isMobile && searchOpen && <SearchBarDropDown />*/}
        </>
    );
};

export default NavBar;
