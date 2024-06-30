import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from "../hooks/useLogin"
import './Form.css'; 


const LoginForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="mainContainer">
        <div className="titleContainer">
          <div>Login</div>
        </div>
        <br />
        <div className="inputContainer">
          <input
            value={email}
            placeholder="Enter your Phone email"
            onChange={(ev) => setEmail(ev.target.value)}
            className="inputBox"
          />
        </div>
        <br />
        <div className="inputContainer">
          <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className="inputBox"
            type="password"
          />
        </div>
        <br />
        <div className="inputContainer">
          <button disabled={isLoading} className="btn">Proceed</button>
        </div>
        <br />
      <div className={'inputContainer'}>
        {error && <p className='errorLabel'>{error}</p>}
      </div>
      <br></br>
        <div className="inputContainer">
          <span>Don't have an account? <Link to="/register" className="signupLink">Sign up</Link></span>
        </div>
      </div>


    </form>
  )
}

export default LoginForm;
