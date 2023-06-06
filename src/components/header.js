import React from 'react'
import { useContext } from "react";
import { GlobalContextmain } from './globalcontext';


const Header = () => {
    const { globalState } = useContext(GlobalContextmain);
    
    return (
        <div className='Cart'>
            <h3 className='cartBorder'>Cart: {Object.values(globalState.items).length > 0 ? Object.values(globalState.items).reduce((a, b) => {
               
                return a + b;
            }) : 0}</h3>
        </div>
    )
}

export default Header;
