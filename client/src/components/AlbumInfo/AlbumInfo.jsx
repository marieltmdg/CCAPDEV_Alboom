import styles from './AlbumInfo.module.css'

import letsStartHere from "../../assets/albums/lets-start-here.jpg"

function AlbumInfo({Album}) {
    return Album && (
        <div className={styles.coverContainer}>
            <img src={"http://localhost:3000/" + Album.cover} className={styles.cover} alt="Let's Start Here" />
            <div className={styles.textOverlay}>
                <h1>{Album.title}</h1>
                <h2>{Album.artist_id.artistname}</h2>
            </div>
        </div>
    )
}

export default AlbumInfo