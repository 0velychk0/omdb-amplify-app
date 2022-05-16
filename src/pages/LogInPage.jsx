import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useToken } from '../auth/useToken';

function LogInPage() {

    const navigate = useNavigate();
    const [token, setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const onLogInClicked = async () => {
        const response = await axios.post('/api/login', {
            email: emailValue,
            password: passwordValue,
        });
        const { token } = response.data;
        setToken(token);
        navigate('/');
    }

    return (
        <div className="content-container modal-main">
            <h1>Log In</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                className="block-input"
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="someone@gmail.com" />
            <input
                className="block-input"
                type="password"
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                placeholder="password" />
            <hr />
            <button
                className="block-button"
                disabled={!emailValue || !passwordValue}
                onClick={onLogInClicked}>Log In</button>
            <button className="block-button"
                onClick={() => navigate('/forgot-password')}>Forgot your password?</button>
            <button
                className="block-button"
                onClick={() => navigate('/signup')}>Don't have an account? Sign Up</button>
        </div>
    );
}

export default LogInPage;

