import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        logo: "#ffedac",
        navbar: {
            bg: "#0e3926", //#00291c #386641
            icon: "#ffffff",
            searchbar: {
                bg: "#ffffff",
                txt: "#000000",
                searchIcon: "#0e3926",
                placeholder: "#0e3926"
            }
        },
        productCard: {
            bg: "#f5f5f5",
            title: "#000000",
            description: "#3c3c3c",
            price: "green", //#0e3926
            stock: "black",
        },
        cartSnackbar: {
            bg: "#ffffff",
        },
        button: {
            bg: "#0e3926",
            txt: "#ffffff"
        },
        cartDrawer: {
            bg: "#ffffff",
            txt: "#000000",
            icon: "red",
            total: "#000000"
        },
        orderStatus: {
            pending: "#e5b700", //e8a736 o
            confirmed: "#301c1b",
            inPreparation: "#ab5e16",
            shipped: "#708d23",
            delivered: "#1a5275", //1a5275 o 0096c7
            canceled: "#70020f"
        }
    }
})

export default theme;