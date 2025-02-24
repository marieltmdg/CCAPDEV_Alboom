import styles from './Search.module.css'

import search from '../../assets/search.png'

function Search() {
    return (
        <div className={styles.wrapper}>
            <input className={styles.search} type="search" size="1" placeholder="Search..." />
            <button className={styles.button}>
                <img src={search} className={styles.icon} />
            </button>
        </div>
    )
}

export default Search