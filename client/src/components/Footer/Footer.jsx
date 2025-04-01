import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Footer() {
    return (
        <footer>
            <div className={styles.start}>
            <p>&copy; {new Date().getFullYear()} Alboom. All rights reserved.</p>
            </div>
            <div className={styles.end}>
                <Link to="/about" className={styles.link}>About this Page</Link>
            </div>
        </footer>
    );
}

export default Footer;
