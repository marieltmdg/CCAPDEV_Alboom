import styles from './AlbumInfo.module.css';

function AlbumInfo({ Album }) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const staticBaseUrl = apiBaseUrl.replace('/api', ''); 

    return Album && (
        <div className={styles.coverContainer}>
            <img 
                src={`${staticBaseUrl}/${Album.cover}`} 
                className={styles.cover} 
                alt={Album.title || "Album Cover"} 
            />
            <div className={styles.textOverlay}>
                <h1>{Album.title}</h1>
                <h2>{Album.artist_id.artistname}</h2>
            </div>
        </div>
    );
}

export default AlbumInfo;