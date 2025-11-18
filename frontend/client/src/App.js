import './App.css';
import Home from "./features/home";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./features/layout";
import ProductDetail from "./features/productDetail";
import DestacadoDetail from "./features/destacadoDetail";
import HelpCenter from "./features/helpCenter";
import SellPage from "./features/sellPage";
import {CartProvider} from "./contexts/cartContext";
import SearchResultPage from "./features/searchResultPage";
import CartDropdown from "./components/cartDropDown";
import LogIn from "./features/logIn";
import SignUp from "./features/signUp";
import PrivateRoute from "./features/privateRoute/privateRoute";
import CheckoutPage from "./features/checkoutProducts";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import OrdersPage from "./features/ordersPage";
import MyProductsPage from "./features/myProductsPage";
import SellerOrderPage from "./features/sellerOrdersPage"
import {UserProvider} from "./contexts/userContext";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CartProvider>
                <UserProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout/>}>
                                <Route element={<PrivateRoute/>}>
                                    <Route path="/misProductos" element={<MyProductsPage/>}/>
                                    <Route path="/historialPedidos" element={<OrdersPage/>}/>
                                    <Route path="/ordenesPendientes" element={<SellerOrderPage/>}/>
                                    <Route path="/vender" element={<SellPage/>}/>
                                    <Route path="/checkout" element={<CheckoutPage/>}/>
                                </Route>
                                <Route index element={<Home/>}/>
                                <Route path="/productos" element={<SearchResultPage/>}/>
                                <Route path="/productos/:id" element={<ProductDetail/>}/>
                                <Route path="/destacados" element={<DestacadoDetail/>}/>
                                <Route path="/logIn" element={<LogIn/>}/>
                                <Route path="/signUp" element={<SignUp/>}/>
                                <Route path="/ayuda" element={<HelpCenter/>}/>
                            </Route>
                        </Routes>
                        <CartDropdown/>
                    </BrowserRouter>
                </UserProvider>
            </CartProvider>
        </ThemeProvider>
    );
}

export default App;
