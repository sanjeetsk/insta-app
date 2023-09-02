import { useState } from "react";
import TokenContext from "./TokenContext";

const TokenProvider = ({children}) => {
    const [token, setToken] = useState()

    return(
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>
    )
}

export default TokenProvider