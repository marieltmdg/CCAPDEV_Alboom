import styles from './Header.module.css'

import { Link } from 'react-router-dom'

import Search from '../Search/Search.jsx'

import logo from '../../assets/logo.png'
import avatar from '../../assets/avatar.png'

function Header({ isAuth }) {
    return <header>
            <div className={styles.start}>
                <Link to="/"><img src={logo} className={styles.logo} /></Link>
            </div>
            <div className={styles.center}>
                <Search />
            </div>
            <div className={styles.end}>
                { isAuth ? <img src={avatar} className={styles.avatar} /> : <Link to="/login" className={styles.login}>Login</Link> }
            </div>
    </header>
}

export default Header