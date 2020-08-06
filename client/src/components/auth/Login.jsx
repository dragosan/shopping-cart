import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {
  const {user,login} = useContext(AuthContext);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errors,setErrors] = useState([]);
    const [passError,setPassError] = useState('');

    const onSubmit = e =>{
      e.preventDefault();
      
      try {
          const user = {email,password}
          login(user)
      } catch (err) {
          console.log(err)
      }
      
  }
    return (
        <div className="form">
    <form onSubmit={onSubmit}>
      <ul className="form-container">
        
          <h2>Login Into Account</h2>
       
        <li className="errors">
          {passError && <h3>{passError}</h3>}
          {errors.length > 0 && <div className="srv-errors">{errors.map(error=><h3 key={error.msg}>{error.msg}</h3>)}</div>}
        </li>
        
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required>
          </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} minLength="6">
          </input>
        </li>
        
        <li>
          <button type="submit" className="button primary">Login</button>
        </li>
        <li>
          don't have an account?
          <Link to="/register" className="button secondary text-center" >Create Account</Link>

        </li>

      </ul>
    </form>
  </div>
    )
}

export default Login
