import styles from './AlbumInfo.module.css';

function AlbumInfo({ Album }) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    return Album && (
        <div className={styles.coverContainer}>
            <img src={`${apiBaseUrl}${Album.cover}`} className={styles.cover} alt="Let's Start Here" />
            <div className={styles.textOverlay}>
                <h1>{Album.title}</h1>
                <h2>{Album.artist_id.artistname}</h2>
            </div>
        </div>
    );
}

export default AlbumInfo;