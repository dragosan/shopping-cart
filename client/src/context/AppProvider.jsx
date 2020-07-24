import React,{createContext,useState} from 'react'

import data from '../data.json';

export const AppContext = createContext();
const AppProvider = props => {
    const [state,setState] = useState({
        products:data.products,
        cart:localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
        size:"",
        sort:""
      })

      const resetProducts = () =>{
          setState({...state,products:data.products})
      }

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
        const cartItems = state.cart.slice();
        localStorage.setItem("cart",JSON.stringify(state.cart.filter(item=>item._id!==product._id)))
        setState({...state,cart:state.cart.filter(item=>item._id!==product._id)})
      }

      const sortProducts = (e) =>{
        setState({...state,
        sort:e.target.value,
        products:state.products.slice().sort((a,b)=> 
        state.sort ==="lowest" ?
         (a.price > b.price ? 1:-1) :state.sort==="highest" ? (a.price < b.price ? 1:-1) :a._id < b._id ? 1 : -1)})
      }
      const filterProducts = (e) =>{
          console.log(e.target.value)
           if(e.target.value==="All"){
               resetProducts();
           }
           else{
            setState({...state,
                size:e.target.value,
                products:data.products.filter(product=> product.availableSizes.indexOf(e.target.value)>=0)})
          }
           }
           
          
        

    return (
        <AppContext.Provider value={
            {...state,
            filterProducts
            ,resetProducts,
            sortProducts,
            addToCart,
            removeFromCart
            }}>
            {props.children}
        </AppContext.Provider>
        
    )
}

export default AppProvider
