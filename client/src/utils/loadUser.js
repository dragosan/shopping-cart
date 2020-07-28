import setAuthToken from "./setAuthToken"

export default loadUser = async () =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get("api/auth")
        return res.data
    } catch (err) {
        console.log(err)
    }
}