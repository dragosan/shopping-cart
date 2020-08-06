import React,{useContext,useEffect} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';

import Header from './components/layout/Header';
import Login from './components/auth/Login';
import Home from './components/Home';
import Register from './components/auth/Register';
import setAuthToken from './utils/setAuthToken';
import { AuthContext } from './context/AuthProvider';
import CartList from './components/cart/CartList';

function App() {
  const {loadUser} = useContext(AuthContext);

useEffect(()=>{
  loadUser();
},[])

  return (
    <Router>
     <div className="grid-container">
       <Header />
      
       <Route exact path="/" component={Home} />
       <Route exact path="/login" component={Login} />
       <Route exact path="/register" component={Register} />
       <Route exact path="/cart-list" component={CartList} />
       <footer>
       All Rights reseverd
       </footer>
       
     </div>
     </Router>
   
  );
}

export default App;
