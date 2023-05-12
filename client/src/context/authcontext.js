import { createContext, useState } from "react";

const AuthContext = createContext()
// AuthProvider is for setup
const AuthProvider = (props) => {
    const [user, setUser] = useState()
    
    return(
        <AuthContext.Provider value={{user, setUser}}>
            {/* children is default keyword in line 11 */}
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}