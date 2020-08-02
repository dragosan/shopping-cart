import React,{useState,useContext} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';


import ProductsList from './components/products/ProductsList';
import Filter from './components/products/Filter';
import Cart from './components/cart/Cart';
import { AuthContext } from './context/AuthProvider';
import Header from './components/layout/Header';
import Login from './components/auth/Login';

function App() {
const {user} = useContext(AuthContext)
console.log(user)
  return (
    <Router>
     <div className="grid-container">
       <Header />
      
       <main>
         <div className="content">
           <div className="main">
             <Filter />
             <Route exact path="/login" component={Login} />
             <Route exact path="/" component={ProductsList} />
           </div>
              <div className="sidebar">
                <Cart /> </div>     
         </div>
       </main>
       
       <footer>
       All Rights reseverd
       </footer>
       
     </div>
     </Router>
   
  );
}

export default App;
