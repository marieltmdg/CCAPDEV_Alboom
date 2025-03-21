import styles from './Header.module.css'

import { Link } from 'react-router-dom'

import logo from '../../assets/logo.png'
import avatar from '../../assets/avatar.png'

function Header({ isAuth }) {
    return <header>
            <div className={styles.start}>
                <Link to="/"><img src={logo} className={styles.logo} /></Link>
            </div>
            <div className={styles.center}>

            </div>
            <div className={styles.end}>
                { isAuth ? <Link to="/user/carlegendelosreyes"><img src={avatar} className={styles.avatar} /></Link> : <Link to="/login" className={styles.login}>Login</Link> }
            </div>
    </header>
}

export default Header