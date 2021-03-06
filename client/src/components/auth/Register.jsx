import React,{useState, useContext} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider';

const Register = () => {
    const {user,register,errors} = useContext(AuthContext)

    
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [password2,setPassword2] = useState('');
    
    const [passError,setPassError] = useState('');

    if(user){
      return <Redirect to="/" />
    }
    const onSubmit = e =>{
        e.preventDefault();
        if(password!==password2){
            setPassError("passwords don't match")
            console.log(errors)
        }
        try {
            const user = {name,email,password}
            register(user)
        } catch (err) {
            console.log(err)
        }
        
    }
    return (
        <div className="form">
    <form onSubmit={onSubmit}>
      <ul className="form-container">
        <li>
          <h2>Create Account</h2>
        </li>
        <li className="errors">
          {passError && <h3>{passError}</h3>}
          {errors &&  errors.length > 0 && <div className="srv-errors">{errors.map(error=><h3 key={error.msg}>{error.msg}</h3>)}</div>}
        </li>
        <li>
          <label htmlFor="name">
            Name
          </label>
          <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} >
          </input>
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} >
          </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} >
          </input>
        </li>
        <li>
          <label htmlFor="password2">Re-Enter Password</label>
          <input type="password" id="Password2" name="Password2" onChange={(e) => setPassword2(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Register</button>
        </li>
        <li>
          Already have an account?
          <Link to="/login" className="button secondary text-center" >Sign into your account</Link>

        </li>

      </ul>
    </form>
  </div>
    )
}

export default Register
