import './Login.css';

import { Link } from "react-router-dom";

import Main from "../components/Main"

import gradient from '../assets/gradient.png';

function Login() {
    return (
        <>
            <Main>
                <div className="login-page">
                    <div className="login-box">
                        <div className="login-image">
                            <img src={gradient} alt="Login Illustration" />
                        </div>
                        <div className="login-form">
                            <p className='p-header'>Login</p>
                            <p className='p-body'>New to Alboom? <Link to="/register" className='link-text-underline'><u>Sign up for free</u></Link></p>
                            <form className='form-properties-log'>
                                <div className="input-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" placeholder="Enter your username" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" placeholder="Enter your password" />
                                </div>
                                <p className='p-body'><Link className='link-text-underline'><u>Forgot your password?</u></Link> </p>
                                <button type="submit" className="login-button">Log In</button>
                            </form>
                        </div>
                        <div className="close-button">
                            <Link to="/" className='close-text'>
                                ×
                            </Link>
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
}

export default Login