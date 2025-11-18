import {Box, Drawer, IconButton, Tooltip} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import {usePanel} from "../hooks/usePanel";
import SearchBar from "./searchBar";
import CloseIcon from "@mui/icons-material/Close";

const SearchSection = () => {
    const {openPanel, closePanel, panelOpen} = usePanel()

    return (
        <>
            <IconButton onClick={openPanel} sx={{ color: "navbar.icon" }}>
                <Tooltip title="Buscar">
                    <SearchIcon />
                </Tooltip>
            </IconButton>

            <Drawer anchor="top" open={panelOpen} onClose={closePanel}>
                <Box role="presentation" sx={{ display: "flex", alignItems: "center", width: "100%", height: "10vh", padding: 2, boxSizing: "border-box", bgcolor: "background.default" }}>
                    <IconButton onClick={closePanel}>
                        <CloseIcon />
                    </IconButton>
                    <SearchBar />
                </Box>
            </Drawer>
        </>
    )
}

export default SearchSection