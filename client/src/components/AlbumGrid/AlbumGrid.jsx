import styles from './AlbumGrid.module.css';

import { Link } from 'react-router-dom';

function AlbumGrid({ albums }) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const staticBaseUrl = apiBaseUrl.replace('api', '');
    
    return (
        <div className={styles.container}>
            {albums.map(album => (
                <Link to={"/album/" + album._id} key={album._id} className={styles.item}>
                    <img src={`${staticBaseUrl}${album.cover}`} alt="" className={styles.cover} />
                </Link>
            ))}
        </div>
    );
}

export default AlbumGrid;