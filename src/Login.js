import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { auth } from './firebase'
import { CurrencyFormat } from 'react-currency-format';


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e=> {
        e.preventDefault()

        auth
            .signInWithEmailAndPassword(email, password)
            .then (auth => {
                navigate('/');
            })
            .catch(error => alert(error.message))

        // firebase.......
    }

    const register = e => {
        e.preventDefault();

        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            //it successfully created a new user with email and password
            if (auth) {
                navigate('/');
            }
            //console.log(auth);
        })
        .catch(error => alert(error.message))


        //firebase..................
    }
  return (
    <div className='login'>
        <Link to='/'>
        <img  className='login__logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png'  alt='AMAZON LOGO'/>
        </Link>

        <div className='login__container'>
            <h1>Sign-In</h1>

            <form>
                <h5>E-mail</h5>
                <input type='text'  value={email} onChange= {e => setEmail(e.target.value)}/>

                <h5>Password</h5>
                <input type='password' value={password}
                onChange={e => setPassword(e.target.value)} />

                <button type="submit" onClick={signIn} className='login__signInButton'> Sign In</button>
            </form>

            <p>
                By signing-in you agree to the Amazon Clone Conditions
                of Use & Sale. Please see our Privacy Notice, our Cookies Noticeand our Intrest-Based Ads Notice.
            </p>

            <button onClick={register}
            className='login__registerButton'>Create your Amazon Account</button>
        </div>
    </div>
  )
}

export default Login
