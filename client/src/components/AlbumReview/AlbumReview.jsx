import Spotify from "../../components/Spotify/spotify.jsx";
import styles from './AlbumReview.module.css';
import { Link } from 'react-router-dom';

function AlbumReview({ Album, Rating }) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const staticBaseUrl = apiBaseUrl.replace('/api', ''); 
    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.left}>
                    <h1 className={styles.albumTitle}>{Album.title}</h1>
                    <img 
                        src={`${staticBaseUrl}/${Album.cover}`} 
                        className={styles.albumCover} 
                        alt={Album.title}
                    />
                    <h1 className={styles.albumRating}>
                        {Rating === -1 ? "No reviews" : `${Rating.toFixed(2)} BOOMS`}
                    </h1>
                </div>

                <div className={styles.right}>
                    <Link to={`/artist/${Album.artist_id.username}`}>
                        <h3 className={styles.artistName}>{Album.artist_id.stagename}</h3>
                    </Link>
                    <h3>{Album.release_date}</h3>
                    <p className={styles.albumDescription}>
                        {Album.description}
                    </p>
                    <Spotify artist={Album.artist_id.stagename} album={Album.title} />
                    <br></br>
                    <Link to={`/album/${Album._id}/create`} className={styles.albumReviewButton}>
                        Review
                    </Link>
                </div>
            </div>
        </>
    );
}

export default AlbumReview;