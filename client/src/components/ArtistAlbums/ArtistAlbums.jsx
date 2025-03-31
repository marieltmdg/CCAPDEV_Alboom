import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ArtistAlbums.module.css";
import axios from "axios";

function ArtistAlbums({ Albums }) {
    const [albumRatings, setAlbumRatings] = useState({});

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const staticBaseUrl = apiBaseUrl.replace('/api', ''); 

    useEffect(() => {
        const fetchRatings = async () => {
            const ratings = {};
            for (const album of Albums) {
                try {
                    const response = await axios.get(`${apiBaseUrl}/reviews/album/${album._id}`);
                    const reviews = response.data;
                    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
                    ratings[album._id] = isNaN(averageRating) ? "-1" : averageRating.toFixed(2);
                } catch (error) {
                    console.error("Error fetching reviews:", error);
                }
            }
            setAlbumRatings(ratings);
        };

        if (Albums.length > 0) {
            fetchRatings();
        }
    }, [Albums, apiBaseUrl]);

    return (
        <div className={styles.artistReviewContainer}>
            {Albums && Albums.map((album) => {
                return (
                    <Link to={`/album/${album._id}`} key={album.title} className={styles.item}>
                        <div className={styles.reviewItem}>
                            <div className={styles.albumCover}>
                                <img
                                    src={`${staticBaseUrl}/${album.cover}`}
                                    alt={`${album.title} Cover`}
                                    className={styles.albumCover}
                                />
                            </div>
                            <div className={styles.ratingContainer}>
                                <span className={styles.boomText}>
                                    {albumRatings[album._id] === "-1" ? "No reviews" : `${albumRatings[album._id]} BOOMS`}
                                </span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default ArtistAlbums;