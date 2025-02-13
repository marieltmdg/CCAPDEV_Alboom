import { useState } from "react";
import Header from "../components/Header/Header.jsx";
import Main from "../components/Main";
import logo from "../assets/logo.png";
import logoDark from "../assets/logoDark.png";
import back from '../assets/back.svg'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AlbumInfo from "../components/AlbumInfo/AlbumInfo.jsx"

import styles from "./CreateReview.module.css"
import Album from "../pages/Album/Album.jsx";

function CreateReview() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const navigate = useNavigate();

    return (
        <>
            <Header isAuth={true} />
            <Main>
                <div className={styles.mainContainer}>
                    <div className={styles.spacer}></div>
                    <div className={styles.bodyContainer}>
                        <h2 className={styles.titleText}>Create a Review</h2>
                        <div className={styles.splitContainer}>
                            <AlbumInfo />
                            <div className={styles.reviewSection}>
                                <input type="text" className={styles.reviewTitle} placeholder="Title of your review"/>
                                <textarea className={styles.reviewText} placeholder="Write your review here..."></textarea>
                                {/* <input type="file" className={styles.uploadInput} accept="image/*" /> */}
                                <label className={styles.uploadLabel}>
                                    <input 
                                        type="file" 
                                        className={styles.uploadInput} 
                                        hidden 
                                    />
                                    Upload Files
                                </label>
                            </div>
                        </div>
                        <div className={styles.boomContainer}>
                            {[1, 2, 3, 4, 5].map((boom) => (
                                <img
                                    key={boom}
                                    src={hover >= boom || rating >= boom ? logo : logoDark}
                                    alt={`${boom} Boom`}
                                    className={styles.boom}
                                    onClick={() => setRating(boom)}
                                    onMouseEnter={() => setHover(boom)}
                                    onMouseLeave={() => setHover(0)}
                                />
                            ))}
                        </div>
                        <button type="submit" className={styles.submitButton}>Submit Review</button>
                    </div>
                    <div className={styles.backContainer}>
                        <button onClick={() => navigate(-1)} className={styles.backButton}>
                            <img src={back} className={styles.backIcon} alt="Back" />
                        </button>
                    </div>
                </div>
            </Main>
        </>
    );
}

export default CreateReview;
