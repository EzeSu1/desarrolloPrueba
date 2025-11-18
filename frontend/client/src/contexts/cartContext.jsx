import {createContext, useState, useContext, useMemo} from 'react';
import { toast } from "react-toastify";

export const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // PARA MOSTRAR UN SNACKBAR //
    const [lastAdded, setLastAdded] = useState(null)
    const [showLastAdded, setShowLastAdded] = useState(false)

    const addToCart = (product, quantity) => {
        setCartItems((prevItems) => {
            const existing_item = prevItems.find(item => item.id === product.id)
            let updated_items

            if (existing_item) {
                updated_items = prevItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
            } else {
                updated_items = [...prevItems, { ...product, quantity: quantity }]
            }

            return updated_items
        });

        setLastAdded({ ...product, _cartEventId: Date.now() })
        setShowLastAdded(true)
    }

    const handleCloseSnackbar = () => setShowLastAdded(false);

    const removeFromCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem.quantity === 1) {
                toast.error(`"${product.titulo}" eliminado del carrito`); //
                return prevItems.filter(item => item.id !== product.id)
            } else {
                toast.warning(`Quitaste una unidad de "${product.titulo}"`);
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotalItems = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, getCartTotalItems, removeFromCart, clearCart, lastAdded, showLastAdded, handleCloseSnackbar, subtotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(CartContext);
};