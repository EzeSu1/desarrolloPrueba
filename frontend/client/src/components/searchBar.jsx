import {Box, Divider, IconButton, InputBase} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const SearchBar = () => {
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const searchProduct = () => {
        if (text.trim() !== "") {
            const query = encodeURIComponent(text.trim());
            navigate(`/productos?titulo=${query}`);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "navbar.searchbar.bg",
                borderRadius: 9999,
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                px: 2,
                py: 0.5,
                width: { xs: "100%", sm: "100%", md: "60%", lg: "45%" },
                height: "40px"
            }}
        >
            <IconButton onClick={searchProduct} sx={{ color: "navbar.searchbar.searchIcon", mr: 1 }}>
                <SearchIcon />
            </IconButton>

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <InputBase
                placeholder="¿Qué estás buscando?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") searchProduct() }}
                sx={{
                    flex: 1,
                    color: "navbar.searchbar.txt",
                    "& input::placeholder": { color: "navbar.searchbar.placeholder" },
                }}
            />
        </Box>
    )
}

export default SearchBar