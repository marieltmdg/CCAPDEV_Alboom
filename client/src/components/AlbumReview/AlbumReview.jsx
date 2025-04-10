import Spotify from "../../components/Spotify/spotify.jsx";
import styles from './AlbumReview.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from "../../authContext.jsx";

function AlbumReview({ Album, Rating }) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const staticBaseUrl = apiBaseUrl.replace('/api', ''); 
    const { authState } = useAuth(); // Get setAuthState from context
    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.left}>
                    <img 
                        src={`${staticBaseUrl}/${Album.cover}`} 
                        className={styles.albumCover} 
                        alt={Album.title}
                    />
                    <h1 className={styles.albumRating}>
                        {Rating === -1 ? "No reviews" : `${Rating.toFixed(1)} BOOMS`}
                    </h1>
                </div>

                <div className={styles.right}>
                    <h1 className={styles.albumTitle}>{Album.title}</h1>
                    <Link to={`/artist/${Album.artist_id.username}`}>
                        <h2 className={styles.artistName}>{Album.artist_id.stagename}</h2>
                    </Link>
                    <h3 style={{ fontWeight: "normal" }}>Release Date: {Album.release_date}</h3>
                    <p className={styles.albumDescription}>
                        {Album.description}<br></br>
                    </p>
                    <Spotify artist={Album.artist_id.stagename} album={Album.title} />
                    <br></br>
                    {authState.authenticated && authState.type === 'user' && (
                        <Link to={`/album/${Album._id}/create`} className={styles.albumReviewButton}>
                            Review
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}

export default AlbumReview;