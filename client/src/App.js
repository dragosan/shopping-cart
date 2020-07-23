import React,{useState} from 'react';
import './App.css';

import data from './data.json';
import ProductsList from './components/products/ProductsList';

function App() {
  const [state,setState] = useState({
    products:data.products,
    size:"",
    sort:""
  })

  return (
    <div className="App">
     <div className="grid-container">
       <header>shopping cart</header>
       <main>
         <div className="content">
           <div className="main">
           <ProductsList products={state.products}/>  
           </div>
              <div className="sidebar">
                Cart Items</div>     
         </div>
       </main>
       <footer>
       All Rights reseverd  

       </footer>
       
     </div>
    </div>
  );
}

export default App;
