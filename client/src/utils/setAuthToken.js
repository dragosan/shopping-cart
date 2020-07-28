import axios from 'axios'


export default setAuthToken = (token) =>{
    if(token){
        axios.defaults.headers.common["token"] = token
    } else{
        delete axios.defaults.headers.common["token"]
    }
}