import { Outlet } from "react-router";
import Header from "../../components/Header.jsx";
import Navbar from "../../components/Navbar.jsx";

const Layout = () => {
    return(
        <>
          <Header nombre="julian"></Header>
          <Navbar></Navbar>
          <Outlet />
        </>
    )
}

export default Layout;