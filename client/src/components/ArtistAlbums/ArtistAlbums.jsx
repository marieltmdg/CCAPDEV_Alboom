import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./ArtistAlbums.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

function ArtistAlbums({Albums}) {
    const [albumRatings, setAlbumRatings] = useState({});

    useEffect(() => {
        const fetchRatings = async () => {
            const ratings = {};
            for (const album of Albums) {
                try {
                    const response = await axios.get(`/api/reviews/album/${album._id}`);
                    const reviews = response.data;
                    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
                    if (isNaN(averageRating)) {
                        ratings[album._id] = "-1";
                    } else {
                        ratings[album._id] = averageRating.toFixed(2); 
                    }
                } catch (error) {
                    console.error("Error fetching reviews:", error);
                }
            }
            setAlbumRatings(ratings);
        };

        if (Albums.length > 0) {
            fetchRatings();
        }
    }, [Albums]);

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
                                <span className={styles.boomText}>
                                    {albumRatings[album._id] === "-1" ? "No ratings" : `${albumRatings[album._id]} BOOMS`}
                                </span>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default ArtistAlbums;