import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <div className={styles.start}>
                &copy; {new Date().getFullYear()} Alboom. All rights reserved.
            </div>
            <div className={styles.end}>
                <Link to="/about" className={styles.link}>About this Page</Link>
            </div>
        </footer>
    );
}

export default Footer;
