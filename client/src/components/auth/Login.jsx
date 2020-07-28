import React,{useState} from 'react'
import {Link} from 'react-router-dom'

const Login = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [password2,setPassword2] = useState('');
    const [errors,setErrors] = useState([]);
    const [passError,setPassError] = useState('');
    return (
        <div className="form">
    <form onSubmit={onSubmit} >
      <ul className="form-container">
        <li>
          <h2>Create Account</h2>
        </li>
        <li className="errors">
          {passError && <h3>{passError}</h3>}
          {errors.length > 0 && <div className="srv-errors">{errors.map(error=><h3 key={error.msg}>{error.msg}</h3>)}</div>}
        </li>
        <li>
          <label htmlFor="name">
            Name
          </label>
          <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} required>
          </input>
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

export default Login
