import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./ArtistAlbums.module.css";

import theDarkSideOfTheMoon from "../../assets/albums/the-dark-side-of-the-moon.jpg";
import skipp from "../../assets/albums/skipp.jpg";
import chromakopia from "../../assets/albums/chromakopia.jpg";
import flowerBoy from "../../assets/albums/flower-boy.jpg";
import letsStartHere from "../../assets/albums/lets-start-here.jpg";
import toPimpAButterfly from "../../assets/albums/to-pimp-a-butterfly.jpg";

const mockReviews = [
    {
        artist: "Pink-Floyd",
        albums: [
            {
                title: 'The Dark Side of the Moon',
                cover: theDarkSideOfTheMoon,
                ratings: [5, 5, 5]
            }
        ]
    },
    {
        artist: "Unknown-Artist",
        albums: [
            {
                title: 'SKIPP',
                cover: skipp,
                ratings: [4, 4, 4]
            }
        ]
    },
    {
        artist: "Tyler,-The-Creator",
        albums: [
            {
                title: 'Flower-Boy',
                cover: flowerBoy,
                ratings: [5, 5, 5]
            },
            {
                title: 'CHROMAKOPIA',
                cover: chromakopia,
                ratings: [3, 3, 3]
            }
        ]
    },
    {
        artist: "Lil-Yachty",
        albums: [
            {
                title: 'Let\'s Start Here',
                cover: letsStartHere,
                ratings: [4, 4, 4]
            }
        ]
    },
    {
        artist: "Kendrick-Lamar",
        albums: [
            {
                title: 'To Pimp a Butterfly',
                cover: toPimpAButterfly,
                ratings: [5, 5, 5]
            }
        ]
    }
];

function ArtistAlbums() {
    const { artist } = useParams(); 

    const artistData = mockReviews.find(entry => entry.artist === artist);
    const albums = artistData ? artistData.albums : [];

    return (
        <div className={styles.artistReviewContainer}>
            {albums.map((album) => {
                const averageRating = (album.ratings.reduce((a, b) => a + b, 0) / album.ratings.length).toFixed(1);
                return (
                    <Link to={"/album/" + album.title} key={album.title} className={styles.item}>
                        <div className={styles.reviewItem}> 
                            <div className={styles.albumCover}>
                                <img src={album.cover} alt={`${album.title} Cover`} className={styles.albumCover} />
                            </div>
                            <div className={styles.ratingContainer}>
                                <span className={styles.boomText}>{averageRating} BOOMS</span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default ArtistAlbums;
