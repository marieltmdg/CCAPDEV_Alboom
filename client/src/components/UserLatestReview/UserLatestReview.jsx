import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./UserLatestReview.module.css";
import BoomMeter from "../BoomMeter/BoomMeter";

function UserLatestReview({ userData }) {
    const { username } = useParams();
    const [userReview, setUserReview] = useState(null);
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const apiUrl = `/api/user/readUserID/${userData._id}`;
                console.log("Fetching user review data from:", apiUrl);
                
                const response = await axios.get(apiUrl);
                const reviews = response.data;
    
                console.log("Review data:", reviews);
    
                if (reviews.length > 0) {
                    const sortedRev = reviews.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
                    setUserReview(sortedRev);
                } else {
                    setUserReview(null);
                }
    
            } catch (err) {
                console.error("Error fetching user:", err.response ? err.response.data : err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchReviews();
    }, [userData._id]);  

    useEffect(() => {
        console.log("Updated userReview:", userReview);
    }, [userReview]);
    
    
    useEffect(() => {
        const fetchAlbum = async () => {
            if (!userReview || !userReview.album_id) return; 
    
            try {
                const albumId = userReview.album_id?._id || userReview.album_id;
                console.log("Extracted albumId:", albumId);
                
                const apiUrl2 = `/api/album/${albumId}`;
                console.log("Fetching album data from:", apiUrl2);
                
                const response = await axios.get(apiUrl2);
    
                if (!response.data) {
                    setAlbum(null);
                } else {
                    setAlbum(response.data);
                }
    
            } catch (err) {
                console.error("Error fetching album:", err.response ? err.response.data : err.message);
                setError(err.message);
            }
        };
    
        if (userReview) {
            fetchAlbum();
        }
    }, [userReview]); 
    
    console.log("User review:", userReview);
    console.log("Album:", album);

    if (!userReview || !album) {
        return (
            <div className={styles.container}>
                <div className={styles.latestReviewText}>Latest Review</div>
                <div className={styles.noReviewText}>No reviews found for this user</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.latestReviewText}>Latest Review</div>

            <div className={styles.albumCover}>
                <Link to={"/album/" + album.title} key={album.title}>
                    <img src={album.cover ? `http://localhost:3000/${album.cover}` : avatar} className={styles.albumCover} />
                </Link>
            </div>

            <div className={styles.detailsContainer}>
                <div className={styles.albumInfoContainer}>
                    <div className={styles.albumTitle}>{album.title}</div>
                    <div className={styles.artist}>By {album.artist_id?.artistname}</div>
                </div>

                <div className={styles.reviewInfoContainer}>
                    <div className={styles.reviewTitle}>"{userReview.title}"</div>
                    <div className={styles.reviewText}>{userReview.review_text}</div>
                </div>

                <div className={styles.topCommentContainer}>
                    <div className={styles.topCommentText}>Top Comment</div>
                    <div className={styles.topComment}>{album.description }</div>
                </div>
            </div>

            
            <div className={styles.boomContainer}>
                <BoomMeter Rating={userReview.rating} />
            </div>

        </div>
        
    );
}

export default UserLatestReview;