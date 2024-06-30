import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import './Form.css';


const RegisterForm = (props) => {
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [passwordError, setPasswordError] = useState('')
  // const [emailError, setEmailError] = useState('')
  const {signup,error, isLoading} = useSignup()


  const handleSubmit = async(e) => {
  
    e.preventDefault()

    await signup(email,password)
  
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Register</div>
      </div>
      <br />
  
     
      <div className={'inputContainer'}>
        <input
        type='email'
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
      
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your Password"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        
      </div>
      <br />
      <div className={'inputContainer'}>
        <button type='submit' disabled={isLoading} className='btn'>Register</button>
      </div>
    </div>
      <div className={'inputContainer'}>
        {error && <p className='errorLabel'>{error}</p>}
      </div>
    

    </form>
  )
}

export default RegisterForm