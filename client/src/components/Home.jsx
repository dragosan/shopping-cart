import React from 'react'
import {Route} from 'react-router-dom'
import Login from './auth/Login'
import ProductsList from './products/ProductsList'
import Cart from './cart/Cart'
import Filter from './products/Filter'

const Home = () => {
    return (
        <main>
         <div className="content">
           <div className="main">
             <Filter />
             
             <Route exact path="/" component={ProductsList} />
           </div>
              <div className="sidebar">
                <Cart /> </div>     
         </div>
       </main>
    )
}

export default Home
