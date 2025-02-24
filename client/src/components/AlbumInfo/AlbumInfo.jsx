import styles from './AlbumInfo.module.css'

import letsStartHere from "../../assets/albums/lets-start-here.jpg"

function AlbumInfo() {
    return (
        <div className={styles.coverContainer}>
            <img src={letsStartHere} className={styles.cover} alt="Let's Start Here" />
            <div className={styles.textOverlay}>
                <h1>Let's Start Here.</h1>
                <h2>Lil Yachty</h2>
            </div>
        </div>
    )
}

export default AlbumInfo