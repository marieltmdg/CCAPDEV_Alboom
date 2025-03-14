import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/axios"
import styles from './Register.module.css'

import { Link } from "react-router-dom"

import Main from "../../components/Main"

import alboom from '../../assets/alboom.png'
import close from '../../assets/close.svg'
import avatar from '../../assets/avatar.png'
import upload from '../../assets/upload.svg'

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("bio", bio);
        if (photo) {
            formData.append("photo", photo);
        }
        console.log(formData.get("photo"));

        try {
            const response = await api.post("/user", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSuccess(true);
            setTimeout(() => {
                navigate("/login"); 
            }, 3000); 
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "An error occurred");
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
                            <h1>Register</h1>
                            <p>Already have an account? <Link to="/login" className={styles.link}><u>Login</u></Link></p>
                        </div>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputs}>
                                <div className={styles.row}>
                                    <label htmlFor="avatar" className={styles.avatar}>
                                        <img id="preview" src={photo ? URL.createObjectURL(photo) : avatar} className={styles.preview} alt="Avatar" />
                                        <input type="file" id="avatar" accept="image/*" className={styles.upload} onChange={handleFileChange} />
                                        <img src={upload} alt="Upload" className={styles.uploadIcon} />
                                    </label>
                                </div>
                                <div className={styles.row}>
                                    <label htmlFor="username" className={styles.label}>Username</label>
                                    <input type="text" id="username" placeholder="Enter your username" className={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className={styles.row}>
                                    <label htmlFor="email" className={styles.label}>Email</label>
                                    <input type="email" id="email" placeholder="Enter your email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className={styles.row}>
                                    <label htmlFor="password" className={styles.label}>Password</label>
                                    <input type="password" id="password" placeholder="Enter your password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className={styles.row}>
                                    <label htmlFor="bio" className={styles.label}>Bio</label>
                                    <textarea name="bio" id="bio" className={styles.input} rows="4" placeholder='Write something about yourself...' value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                                </div>
                            </div>
                            {error && <div className={styles.error}>{error}</div>}
                            <button type="submit" className={styles.button}>Register</button>
                        </form>
                    </div>
                    <Link to="/">
                        <img src={close} alt="Close" className={styles.close}/>
                    </Link>
                </div>
            </div>
            {success && (
                <div className={styles.popup}>
                    <p>Registration successful! Redirecting to login...</p>
                </div>
            )}
        </Main>
    );
}

export default Register;