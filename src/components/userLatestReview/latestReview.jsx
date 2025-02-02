import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./latestReview.module.css";
import BoomMeter from "../BoomMeter/BoomMeter";
import channelOrange from "../../assets/albums/channel-orange.jpg";

const latestReviewData = [
    {
        username: "johndoe",
        name: "John Doe",
        albumTitle: "Channel Orange",
        artist: "Frank Ocean",
        reviewText: "A masterpiece that blends soul, R&B, and hip-hop seamlessly.",
        topComment: "Incredible album. One of the best of the decade.",
        albumCover: channelOrange,
        boomRating: 5,
    },
    {
        username: "janedoe",
        name: "Jane Doe",
        albumTitle: "Channel Orange",
        artist: "Frank Ocean",
        reviewText: "Lyrically deep and emotionally raw, a true work of art. The storytelling on this album is unmatched. Frank Ocean's voice is magnetic, and the album's mood is hauntingly beautiful.",
        topComment: "The storytelling on this album is unmatched.",
        albumCover: channelOrange,
        boomRating: 4,
    },
    {
        username: "musicfan",
        name: "Music Fan",
        albumTitle: "Channel Orange",
        artist: "Frank Ocean",
        reviewText: "The production is exquisite, and the emotions run high throughout. An instant classic, worth every listen.",
        topComment: "An instant classic, worth every listen.",
        albumCover: channelOrange,
        boomRating: 4.5,
    },
    {
        username: "concertlover",
        name: "Concert Lover",
        albumTitle: "Channel Orange",
        artist: "Frank Ocean",
        reviewText: "Frank Ocean's voice is magnetic, and the album's mood is hauntingly beautiful. Can't stop listening to this, every track hits differently.",
        topComment: "Can't stop listening to this, every track hits differently.",
        albumCover: channelOrange,
        boomRating: 5,
    }
];

function LatestReview() {
    const { username } = useParams();

    const userReview = latestReviewData.find(user => user.username === username);

    if (!userReview) {
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
                <Link to={"/album/" + userReview.albumTitle} key={userReview.albumTitle}>
                    <img src={userReview.albumCover} alt={userReview.albumTitle} className={styles.albumCover} />
                </Link>
            </div>

            <div className={styles.detailsContainer}>
                <div className={styles.albumInfoContainer}>
                    <div className={styles.albumTitle}>{userReview.albumTitle}</div>
                    <div className={styles.artist}>By {userReview.artist}</div>
                </div>

                <div className={styles.reviewInfoContainer}>
                    <div className={styles.reviewText}>{userReview.reviewText}</div>
                </div>

                <div className={styles.topCommentContainer}>
                    <div className={styles.topCommentText}>Top Comment</div>
                    <div className={styles.topComment}>{userReview.topComment}</div>
                </div>
            </div>

            
            <div className={styles.boomContainer}>
                <BoomMeter Rating={userReview.boomRating} />
            </div>

        </div>
        
    );
}

export default LatestReview;