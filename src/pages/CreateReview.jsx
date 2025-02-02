import { useState } from "react";
import Header from "../components/Header/Header.jsx";
import Main from "../components/Main";
import logo from "../assets/logo.png";
import logoDark from "../assets/logoDark.png";
import back from '../assets/back.svg'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "./CreateReview.module.css"

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
                        <textarea className={styles.reviewText} placeholder="Write your review here..."/>
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
                        <button type="submit" className={styles.submitButton}>Submit Rating</button>
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
