import React, { useState } from 'react';
import './Form.css';

const RegisterForm = (props) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [numberError, setNumberError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [nameError, setNameError] = useState('')



  const onButtonClick = () => {
  }

  return (
    <form className="login-form1" >
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Register</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={name}
          placeholder="Enter your Name"
          onChange={(ev) => setNumber(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{nameError}</label>
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
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <button className='btn' type="submit">Register</button>
      </div>
    </div>
    </form>
  )
}

export default RegisterForm