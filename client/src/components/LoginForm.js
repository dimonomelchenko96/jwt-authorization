import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {login, registration, logout} from '../store/authSlice'

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    return (
        <div>
            <input
                type='text'
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type='password'
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <div>
                <button onClick={() => dispatch(login(email, password))}>Логін</button>
                <button onClick={() => dispatch(registration(email, password))}>Реєстрація</button>
            </div>
        </div>
    )
}

export default LoginForm