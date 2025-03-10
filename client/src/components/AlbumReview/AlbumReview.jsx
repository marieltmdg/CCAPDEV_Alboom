import styles from './AlbumReview.module.css'
import albumCover from '../../assets/albums/flower-boy.jpg'

import { Link } from 'react-router-dom'

function AlbumReview(props) {
    return(
        <div className={styles.mainContainer}>

            <div className={styles.left}>
                <h1 className={styles.albumTitle}>{props.AlbumTitle}</h1>
                <img src={"http://localhost:3000/" + props.AlbumCover} className={styles.albumCover}></img>
                <h1 className={styles.albumRating}>{props.AlbumRating} BOOMS</h1>
            </div>

            <div className={styles.right}>
                <Link to={"/artist/" + props.AlbumArtist}><h3 className={styles.artistName}>{props.AlbumArtist}</h3></Link>
                <h3>{props.AlbumReleaseDate}</h3>
                <p className={styles.albumDescription}>
                    {props.AlbumDescription}
                </p>
                <Link to={"/album/" + props.AlbumTitle + "/create"}className={styles.albumReviewButton}>Review</Link>
            </div>
    </div>
    )
}

export default AlbumReview