import React,{createContext,useState} from 'react'


export const AuthContext = createContext()
const AuthProvider = (props) => {
    const [user,setUser] = useState({
        user:null,
        token:null
    })

    return (
        <AuthContext.Provider value={{...user}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
