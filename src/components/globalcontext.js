import { useState, createContext } from "react";

export const GlobalContextmain = createContext();
const GlobalContext = (props) => {
    const [globalState, setGlobalState] = useState({
        items: {}
    });
    return (
        <GlobalContextmain.Provider value={{globalState, setGlobalState}}>
           {props.children}
        </GlobalContextmain.Provider>
    );
};
export default GlobalContext;