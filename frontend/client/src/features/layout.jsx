import Footer from "../components/footer";
import NavBar from "../components/navBar";
import TabBar from "../components/tabBar";
import {Outlet} from "react-router";
import {Box} from "@mui/material";



const Layout = () => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <NavBar />
            <TabBar />
            <Box component="main" flex="1">
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
}

export default Layout;