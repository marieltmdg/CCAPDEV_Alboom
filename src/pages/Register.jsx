import './Register.css';

import { Link } from "react-router-dom";
import Main from "../components/Main"
import gradient from '../assets/gradient.png';


function Register() {
    return (
        <>
            <Main>
                <div className="signup-page">
                    <div className="signup-box">
                        <div className="signup-image">
                            <img src={gradient} alt="Signup Illustration" />
                        </div>
                        <div className="signup-form">
                            <p className='p-header'>Sign Up</p>
                            <p className='p-body'>Already have an account? <Link to="/login" className='link-text'><u>Log in</u></Link></p>
                            <form className='form-properties'>
                                <div className="input-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="text" id="email" placeholder="Enter your email address" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" placeholder="Enter your username" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" placeholder="Enter your password" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="confirm">Confirm Password</label>
                                    <input type="text" id="confirm" placeholder="Re-enter your password" />
                                </div>
                                <div className="profile-container">
                                <div className="left-side">
                                    <p className="title">Upload Photo</p>
                                    <div className="image-placeholder"> Image </div>
                                </div>

                                <div className="right-side">
                                    <p className="title">Bio</p>
                                    <textarea className="bio-textarea" placeholder="Write something about yourself..."/>
                                </div>
                                </div>
                                <button type="submit" className="signup-button">Log In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Main>
        </>
    )
}

export default Register