import React,{useContext} from 'react'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'

const Header = () => {
    const {user} = useContext(AuthContext)
    const authLinks = (
      <header className="header">
        <button className="btn-header">
          &#9776;
          </button>
      <div className="brand">
        
        <NavLink to="/">amazona</NavLink>
      </div>
      <div className="header-links">
        <NavLink to="/cart">Cart</NavLink>
        
      </div>
    </header>
    )

    const guestLinks = (
      <header className="header">
      <div className="brand">
        
          &#9776;
        
        <NavLink to="/">amazona</NavLink>
      </div>
      <div className="header-links">
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </header>
  )

    return user ? authLinks : guestLinks
}

export default Header
