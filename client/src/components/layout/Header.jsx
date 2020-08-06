import React,{useContext} from 'react'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'

const Header = () => {
    const {user,logout} = useContext(AuthContext)
    const authLinks = (
      <header className="header">
        
      <div className="brand">
      <button className="btn-header">
          &#9776;
          </button>
        <NavLink to="/">amazona</NavLink>
      </div>
      <div className="header-links">
        <NavLink to="/cart">Cart</NavLink>
        {user && <NavLink to="/">{user.name}</NavLink>}
        <NavLink to="/" onClick={logout}>Sign Out</NavLink>
        
        
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
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </header>
  )

    return user ? authLinks : guestLinks
}

export default Header
