import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./UserReviews.module.css";

import theDarkSideOfTheMoon from "../../assets/albums/the-dark-side-of-the-moon.jpg";
import skipp from "../../assets/albums/skipp.jpg";
import chromakopia from "../../assets/albums/chromakopia.jpg";
import flowerBoy from "../../assets/albums/flower-boy.jpg";
import letsStartHere from "../../assets/albums/lets-start-here.jpg";
import toPimpAButterfly from "../../assets/albums/to-pimp-a-butterfly.jpg";
import channelOrange from "../../assets/albums/channel-orange.jpg";

const mockReviews = [
    {
        username: "johndoe",
        reviews: [
            {
                title: 'The Dark Side of the Moon',
                cover: theDarkSideOfTheMoon,
                rating: 5
            },
            {
                title: 'SKIPP',
                cover: skipp,
                rating: 4
            },
            {
                title: 'CHROMAKOPIA',
                cover: chromakopia,
                rating: 3
            },
            {
                title: 'Flower Boy',
                cover: flowerBoy,
                rating: 5
            },
            {
                title: 'Let\'s Start Here',
                cover: letsStartHere,
                rating: 4
            },
            {
                title: 'To Pimp a Butterfly',
                cover: toPimpAButterfly,
                rating: 5
            }
        ]
    },
    {
        username: "janedoe",
        reviews: [
            {
                title: 'The Dark Side of the Moon',
                cover: theDarkSideOfTheMoon,
                rating: 5
            },
            {
                title: 'SKIPP',
                cover: skipp,
                rating: 4
            },
            {
                title: 'CHROMAKOPIA',
                cover: chromakopia,
                rating: 3
            }
        ]
    },
    {
        username: "musicfan",
        reviews: [
            {
                title: 'Channel Orange',
                cover: toPimpAButterfly,
                rating: 3
            }
        ]
    }
];

function UserReviews() {
    const { username } = useParams(); 

    const userReviews = mockReviews.find(user => user.username === username)?.reviews || [];

    return (
        <div className={styles.userReviewContainer}>
            {userReviews.map((review, index) => (
                <Link to={"/album/" + review.title} key={review.title} className={styles.item}>
                    <div className={styles.reviewItem}> 
                        <div className={styles.albumCover}>
                            <img src={review.cover} alt={`${review.title} Cover`} className={styles.albumCover} />
                        </div>
                        <div className={styles.ratingContainer}>
                            <span className={styles.boomText}>{review.rating} BOOMS</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default UserReviews;