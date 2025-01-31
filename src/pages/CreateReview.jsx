import { useState } from "react";
import Header from "../components/Header/Header.jsx";
import Main from "../components/Main";
import logo from "../assets/logo.png";
import logoDark from "../assets/logoDark.png";
import back from '../assets/back.svg'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./CreateReview.css";

function CreateReview() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const navigate = useNavigate();

    return (
        <>
            <Header isAuth={true} />
            <Main>
                <div className="main-container">
                    <div className="spacer"></div>
                    <div className="body-container">
                        <h2 className="title-text">Create a Review</h2>
                        <textarea className="review-text" placeholder="Write your review here..."/>
                        <div className="boomContainer">
                            {[1, 2, 3, 4, 5].map((boom) => (
                                <img
                                    key={boom}
                                    src={hover >= boom || rating >= boom ? logo : logoDark}
                                    alt={`${boom} Boom`}
                                    className="boom"
                                    onClick={() => setRating(boom)}
                                    onMouseEnter={() => setHover(boom)}
                                    onMouseLeave={() => setHover(0)}
                                />
                            ))}
                        </div>
                        <button type="submit" className="submit-button">Submit Rating</button>
                    </div>
                    <div className="back-container">
                        <button onClick={() => navigate(-1)} className="back-button">
                            <img src={back} className="back-icon" alt="Back" />
                        </button>
                    </div>
                </div>
            </Main>
        </>
    );
}

export default CreateReview;
