import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./ArtistAlbums.module.css";

function ArtistAlbums({Albums}) {
    return (
        <div className={styles.artistReviewContainer}>
            {Albums && Albums.map((album) => {
                return (
                    <Link to={"/album/" + album._id} key={album.title} className={styles.item}>
                        <div className={styles.reviewItem}> 
                            <div className={styles.albumCover}>
                                <img src={"http://localhost:3000/" + album.cover} alt={`${album.title} Cover`} className={styles.albumCover} />
                            </div>
                            <div className={styles.ratingContainer}>
                                <span className={styles.boomText}>{5} BOOMS</span>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default ArtistAlbums;