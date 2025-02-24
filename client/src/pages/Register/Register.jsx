import styles from './Register.module.css';

import { Link } from "react-router-dom"

import Main from "../../components/Main"

import alboom from '../../assets/alboom.png'
import close from '../../assets/close.svg'
import avatar from '../../assets/avatar.png'
import upload from '../../assets/upload.svg'

function Register() {
    return (
        <Main>
            <div className={styles.container}>
                <div className={styles.modal}>
                    <div className={styles.gradient}>
                        <img src={alboom} alt="Login Illustration" className={styles.alboom} />
                    </div>
                    <div className={styles.login}>
                        <div className={styles.header}>
                            <h1>Register</h1>
                            <p>Already have an account? <Link to="/login" className={styles.link}><u>Login</u></Link></p>
                        </div>
                        <form className={styles.form}>
                            <div className={styles.inputs}>
                                <div className={styles.row}>
                                    <label htmlFor="avatar" className={styles.avatar}>
                                        <img id="preview" src={avatar} alt="Avatar" class={styles.preview} />
                                        <input type="file" id="avatar" accept="image/*" className={styles.upload} />
                                        <img src={upload} alt="Upload" className={styles.uploadIcon} />
                                    </label>
                                </div>
                                <div className={styles.row}>
                                    <label htmlFor="username" className={styles.label}>Username</label>
                                    <input type="text" id="username" placeholder="Enter your username" className={styles.input} />
                                </div>
                                <div className={styles.row}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" placeholder="Enter your password" className={styles.input} />
                                </div>
                                <div className={styles.row}>
                                    <label htmlFor="bio">Bio</label>
                                    <textarea name="bio" id="bio" className={styles.input} rows="4" placeholder='Write something about yourself...'></textarea>
                                </div>
                            </div>
                            <button type="submit" className={styles.button}>Register</button>
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

export default Register