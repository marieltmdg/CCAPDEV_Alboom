import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./UserReviews.module.css";
import avatar from "../../assets/avatar.png"; // Default album cover

function UserReviews({ userData }) {
    const { username } = useParams();
    const [userReviews, setUserReviews] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const apiUrl = `${apiBaseUrl}/reviews/user/${userData._id}`;
                console.log("Fetching user review data from:", apiUrl);
                
                const response = await axios.get(apiUrl);
                const reviews = response.data;

                console.log("User Reviews:", reviews);

                if (reviews.length > 0) {
                    reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setUserReviews(reviews);
                } else {
                    setUserReviews([]);
                }
            } catch (err) {
                console.error("Error fetching user:", err.response ? err.response.data : err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [userData._id, apiBaseUrl]);

    useEffect(() => {
        const fetchAlbums = async () => {
            if (!userReviews || !userReviews.length) return;
    
            try {
                const albumIds = userReviews.map(review => review.album_id?._id || review.album_id);  
                const uniqueAlbums = {};
    
                for (const albumId of albumIds) {
                    if (!albumId || uniqueAlbums[albumId]) continue; 
    
                    const response = await axios.get(`${apiBaseUrl}/albums/${albumId}`);
                    uniqueAlbums[albumId] = response.data;
                }
    
                setAlbums(Object.values(uniqueAlbums)); 
    
            } catch (err) {
                console.error("Error fetching albums:", err.response ? err.response.data : err.message);
            }
        };
    
        if (userReviews.length > 0) {
            fetchAlbums();
        }
    }, [userReviews, apiBaseUrl]);
    

    if (loading) {
        return <div>Loading reviews...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (userReviews.length === 0) {
        return <div></div>;
    }

    return (
        <div className={styles.userReviewContainer}>
            {userReviews.map((review, index) => {
                const album = albums[index] || {}; 

                return (
                    <Link to={`/album/${album._id || "unknown"}`} key={review._id} className={styles.item}>
                        <div className={styles.reviewItem}>
                            <div className={styles.albumCover}>
                                <img 
                                    src={album.cover ? `${apiBaseUrl}${album.cover}` : avatar} 
                                    alt={`${album.title || "Album"} Cover`} 
                                    className={styles.albumCover} 
                                />
                            </div>
                            <div className={styles.ratingContainer}>
                                <span className={styles.boomText}>{review.rating} BOOMS</span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default UserReviews;