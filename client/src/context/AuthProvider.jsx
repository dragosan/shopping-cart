import React,{createContext,useState} from 'react'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'


export const AuthContext = createContext()
const AuthProvider = (props) => {
    const [state,setState] = useState({
        user:null,
        token:null,
        errors:[]
    })

    const register = async ({name,email,password}) =>{
        const config = {
            headers :{
                "Content-Type": "application/json"
            }
        }
        const body = JSON.stringify({name,email,password})
        try {
            logout();
            const res = await axios.post("/api/users",body,config);
            localStorage.setItem("token",res.data.token)
            setAuthToken(res.data.token)
            setState({user:res.data.user,token:res.data.token})
            console.log(res.data)
            setState({token:localStorage.token,user:res.data,errors:[]})
        } catch (err) {
            console.log(err.response.data.errors)
        }
    }

    const login = async ({email,password}) =>{
        const config = {
            headers :{
                "Content-Type": "application/json"
            }
        }
        const body = JSON.stringify({email,password})
        try {
            logout();
            const res = await axios.post("/api/auth",body,config);
            localStorage.setItem("token",res.data.token)
            setAuthToken(res.data.token)
            setState({user:res.data.user.user,token:res.data.token})
            console.log(res.data)
            setState({token:localStorage.token,user:res.data,errors:[]})
        } catch (err) {
            console.log(err)
            setState({...state,errors:err.response.data.errors})
        }
    }

    function loadUser(){
        if(localStorage.token){
            setAuthToken(localStorage.token)
          }
        try {
            const res =  axios.get("api/auth")
            .then(res=> {
                console.log(res.data);
                 setState({token:localStorage.token,user:res.data})})
            .catch(err=>console.log(err))
            
        } catch (err) {
            console.log(err)
        }
    }

    const logout = () =>{
        localStorage.removeItem("token");
        setState({token:null,user:null,errors:[]})
    }

    return (
        <AuthContext.Provider value={{...state,loadUser,register,login,logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
