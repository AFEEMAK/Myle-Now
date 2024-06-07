import React, { useState } from 'react';
import './Form.css';

const LoginForm = (props) => {
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const [numberError, setNumberError] = useState('')
  const [passwordError, setPasswordError] = useState('')


  const onButtonClick = () => {
  }

  return (
    <form className="login-form" >
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={number}
          placeholder="Enter your Phone Number"
          onChange={(ev) => setNumber(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{numberError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <button className='btn' type="submit">Proceed</button>
      </div>
    </div>
    </form>
  )
}

export default LoginForm