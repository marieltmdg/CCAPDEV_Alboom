import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./ArtistAlbums.module.css";

import skipp from "../../assets/albums/skipp.jpg";
import chromakopia from "../../assets/albums/chromakopia.jpg";
import flowerBoy from "../../assets/albums/flower-boy.jpg";
import toPimpAButterfly from "../../assets/albums/to-pimp-a-butterfly.jpg";

const mockAlbums = [
    {
        username: "tyler,-the-creator",
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
        username: "doechii",
        albums: [
            {
                title: 'Alligator Bites Never Heal',
                cover: skipp,
                ratings: [5, 5, 5]
            }
        ]
    },
    {
        username: "kendrick-lamar",
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
    const { username } = useParams(); 

    const artistData = mockAlbums.find(entry => entry.username === username);
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
