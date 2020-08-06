import React,{createContext,useState,useEffect,useRef} from 'react'
import axios from 'axios'



export const AppContext = createContext();
let dbProducts = null;
const AppProvider = props => {
  
    const [state,setState] = useState({
        products:[],
        cart:localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
      })

      

      const getProducts = async ()=>{
        try {
          const res = await axios.get("api/products");
          dbProducts = res.data.slice();
          setState({...state,products:res.data})
        } catch (err) {
          console.log(err)
        }
      } 

      useEffect(()=>{        
        getProducts()
      },[])


     
      
      const addToCart = (product) =>{        
        const cartItems = state.cart.slice();
        let inCart = false;
         cartItems.forEach(item=>{
            if(item._id===product._id){
                item.count++;
                inCart=true;                           
            }            
        })        
        if(!inCart){
            cartItems.push({...product,count:1})            
        }
        localStorage.setItem("cart",JSON.stringify(cartItems))
        setState({...state,cart:cartItems})
      }

      const removeFromCart = (product) =>{
        localStorage.setItem("cart",JSON.stringify(state.cart.filter(item=>item._id!==product._id)))
        setState({...state,cart:state.cart.filter(item=>item._id!==product._id)})
      }

      const sortProducts = (sortType) =>{
        const sortedProducts = state.products.slice();
  if (sortType === "latest") {
    
    sortedProducts.sort((a, b) => a._id > b._id ? 1 : -1 )
  } if(sortType==="lowest"){
    sortedProducts.sort((a, b) => a.price > b.price ? 1 : -1);
  }
   else {
    sortedProducts.sort((a, b) => a.price > b.price ? -1 : 1 );    
  }
  setState({...state,products:sortedProducts})
  
        // setState({...state,
        // sort:e.target.value,
        // products:state.products.slice().sort((a,b)=> 
        // state.sort ==="lowest" ?
        //  (a.price > b.price ? 1:-1) :state.sort==="highest" ? (a.price < b.price ? 1:-1) :a._id < b._id ? 1 : -1)})
      }
      const filterProducts = (sizeValue) =>{
        
        setState({...state,products:dbProducts.slice()})      
        
        if(sizeValue===""){
          setState({...state,products:dbProducts.slice()})
        }else{                        
          setState({...state,products:dbProducts.slice().filter(product => product.availableSizes.indexOf(sizeValue)>=0)})
         
        }       
        
           }
           
          
        

    return (
        <AppContext.Provider value={
            {...state,
            filterProducts,
            sortProducts,
            addToCart,
            removeFromCart
            }}>
            {props.children}
        </AppContext.Provider>
        
    )
}

export default AppProvider
