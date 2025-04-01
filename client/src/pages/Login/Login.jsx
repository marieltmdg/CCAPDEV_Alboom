import styles from './Login.module.css';

import { Link } from "react-router-dom"

import Main from "../../components/Main"

import alboom from '../../assets/alboom.png'
import close from '../../assets/close.svg'

import api from "../../api/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await api.post("/user/login", {
                username,
                password,
            }, {
                withCredentials: true,
            });
    
            console.log("Login successful!", response.data);
    
            navigate("/");
        } catch (err) {
            console.error("Login failed", err.response?.data?.message || err.message);
        }
    };
    
    return (
        <Main>
            <div className={styles.container}>
                <div className={styles.modal}>
                    <div className={styles.gradient}>
                        <img src={alboom} alt="Login Illustration" className={styles.alboom} />
                    </div>
                    <div className={styles.login}>
                        <div className={styles.header}>
                            <h1>Login</h1>
                            <p>New to Alboom? <Link to="/register" className={styles.link}><u>Register</u></Link></p>
                        </div>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputs}>
                                <div className={styles.row}>
                                    <label htmlFor="username" className={styles.label}>Username</label>
                                    <input type="text" id="username" placeholder="Enter your username" className={styles.input} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className={styles.row}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" placeholder="Enter your password" className={styles.input} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className={styles.remember}>
                                    <input type="checkbox" id="remember" />
                                    <label htmlFor="remember">Remember me</label>
                                </div>
                            </div>
                            <button type="submit" className={styles.button}>Login</button>
                        </form>
                    </div>
                    <Link to="/">
                        <img src={close} alt="Close" className={styles.close}/>
                    </Link>
                </div>
            </div>
        </Main>
    );
}

export default Login