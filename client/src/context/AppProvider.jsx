import React,{createContext,useState} from 'react'

import data from '../data.json';

export const AppContext = createContext();
const AppProvider = props => {
    const [state,setState] = useState({
        products:data.products,
        size:"",
        sort:""
      })

      const resetProducts = () =>{
          setState({...state,products:data.products})
      }

      const sortProducts = (e) =>{
        setState({...state,
        sort:e.target.value,
        products:data.products.slice().sort((a,b)=> 
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
        <AppContext.Provider value={{...state,filterProducts,resetProducts,sortProducts}}>
            {props.children}
        </AppContext.Provider>
        
    )
}

export default AppProvider
