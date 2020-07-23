import React,{useState} from 'react';
import './App.css';

import data from './data.json';
import ProductsList from './components/products/ProductsList';
import AppProvider from './context/AppProvider';
import Filter from './components/products/Filter';

function App() {
  

  return (
    
     <div className="grid-container">
       <header>shopping cart</header>
       <main>
         <div className="content">
           <div className="main">
             <Filter />
           <ProductsList />  
           </div>
              <div className="sidebar">
                Cart Items</div>     
         </div>
       </main>
       <footer>
       All Rights reseverd  

       </footer>
       
     </div>
    
   
  );
}

export default App;
