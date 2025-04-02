import styles from './Header.module.css'

import { Link } from 'react-router-dom'

import logo from '../../assets/logo.png'
import avatar from '../../assets/avatar.png'

import axios from "axios";
import { useAuth } from '../../authContext';

function Header({ isAuth }) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const { authState, setAuthState } = useAuth(); // Get setAuthState from context
    const staticBaseUrl = apiBaseUrl.replace('api', '');

    const handleLogout = async () => {
        try {
            await axios.post(`${apiBaseUrl}/user/logout`);
            setAuthState({
                authenticated: false,
                user: null,
                type: null,
            })

        } catch (err) {
            console.error(err);
        }
    };

    return <header>
        <div className={styles.start}>
            <Link to="/"><img src={logo} className={styles.logo} /></Link>
        </div>
        <div className={styles.center}>

        </div>
        <div className={styles.end}>
        {authState.authenticated ? (
        authState.type === "user" ? (
            // User-specific content
            <>
            <Link to="/" className={styles.login} onClick={handleLogout}>
                Logout
            </Link>
            <Link to={`/user/${authState.user.username}`}>
                <img 
                src={`${staticBaseUrl}${authState.user.picture}`} 
                className={styles.avatar} 
                alt="User avatar" 
                />
            </Link>
            </>
        ) : authState.type === "artist" ? (
            // Artist-specific content
            <>
            <Link to="/" className={styles.login} onClick={handleLogout}>
                Logout
            </Link>
            <Link to={`/artist/${authState.user.username}`}>
                <img 
                src={`${staticBaseUrl}${authState.user.picture}`} 
                className={styles.avatar} 
                alt="Artist avatar" 
                />
            </Link>
            </>
        ) : null
        ) : (
        // Not authenticated
        <Link to="/login" className={styles.login}>
            Login
        </Link>
        )}
        </div>
    </header>
}

export default Header
