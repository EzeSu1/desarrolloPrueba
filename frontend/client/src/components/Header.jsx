import React from "react";
import './Header.css';
function Header(persona){ 
    return(
       <header className="header">
            Hola, {persona.nombre} te ofrecemos 3 o 6 cuotas sin interes!
      </header>
)};
export default Header;