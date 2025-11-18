import {createContext, useState, useContext, useEffect} from 'react';
import {getRolUserFromLocalStorage, getUserIdFromLocalStorage} from "../localStorage";


const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isVendedor, setIsVendedor] = useState(null);

    useEffect(() => {
        const user_id = getUserIdFromLocalStorage()
        setIsLoggedIn(!!user_id)
    }, [])

    useEffect(()  => {
        setIsVendedor(getRolUserFromLocalStorage())
    }, [isLoggedIn])

    return (
        <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, isVendedor}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};