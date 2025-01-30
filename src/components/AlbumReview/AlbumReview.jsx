import styles from './AlbumReview.module.css'
import albumCover from '../../assets/albums/flower-boy.jpg'

import { Link } from 'react-router-dom'

function AlbumReview(props) {
    return(
        <div className={styles.mainContainer}>

            <div className={styles.left}>
                <h1 className={styles.albumTitle}>{props.AlbumTitle}</h1>
                <img src={props.AlbumCover} className={styles.albumCover}></img>
                <h1 className={styles.albumRating}>{props.AlbumRating} Booms</h1>
            </div>

            <div className={styles.right}>
                <h3>{props.AlbumArtist}</h3>
                <h3>{props.AlbumReleaseDate}</h3>
                <p className={styles.albumDescription}>
                    {props.AlbumDescription}
                </p>
                <Link to={"/album/" + props.AlbumTitle + "/create"}className={styles.albumReviewButton}>Review</Link>
            </div>
    </div>
    )
}

AlbumReview.defaultProps = {
    AlbumTitle: "Default Album Title",
    AlbumCover: albumCover,
    AlbumRating: 5.0,
    AlbumArtist: "Carlos Delos Reyes",
    AlbumReleaseDate: 2005,
    AlbumDescription: "This album is Endgame-level—each track smacks like a charged creeper, leaving you in a Minecraft trance. The production hits harder than a diamond sword, while the beats are like obsidian, solid and unbreakable. You’ll be mining for more, stuck in an infinite loop of epic Redstone flows and Nether beats."
}

export default AlbumReview