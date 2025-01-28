import './Login.css';

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
                            <p className='p-body'>New to Alboom? <u>Sign up for free</u> </p>
                            <form>
                                <div className="input-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" placeholder="Enter your username" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" placeholder="Enter your password" />
                                </div>
                                <p className='p-body'><u>Forgot your password?</u> </p>
                                <button type="submit" className="login-button">Log In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
}

export default Login