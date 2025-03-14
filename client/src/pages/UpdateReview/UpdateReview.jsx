import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import Main from "../../components/Main.jsx";
import logo from "../../assets/logo.png";
import logoDark from "../../assets/logoDark.png";
import back from '../../assets/back.svg';
import { useParams, useNavigate } from "react-router-dom";
import AlbumInfo from "../../components/AlbumInfo/AlbumInfo.jsx";
import styles from "./UpdateReview.module.css";
import axios from "axios";

function UpdateReview() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const navigate = useNavigate();
    
    const [album, setAlbum] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        review: '',
        picture: null,
    });
    const [userData, setUserData] = useState(null);
    const [review, setReview] = useState(null)

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/reviews/${id}`)
            .then(reviewResponse => setReview(reviewResponse.data))
            .then(console.log(review))
            .catch(err => console.error("Error fetching review:", err));
    }, [id]);

    useEffect(() => {
        if (review) {
            axios.get(`http://localhost:3000/api/albums/${review.album_id._id}`)
            .then(albumResponse => setAlbum(albumResponse.data))
            .catch(err => console.error("Error fetching album:", err));

            axios.get(`http://localhost:3000/api/user/${review.user_id._id}`)
            .then(userResponse => setUserData(userResponse.data))
            .catch(err => console.error("Error fetching user:", err));
            setFormData({
                title: review.title,
                review: review.review_text,
                picture: review.picture,
            });
            setRating(review.rating); // Set the rating from the review
        }
    }, [review]);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "picture" ? files[0] : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        setTimeout(async () => {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("review_text", formData.review);
            data.append("rating", String(rating)); // Convert to string
            data.append("user_id", userData._id);
            data.append("album_id", album._id);

            if (formData.picture) {
                data.append("picture", formData.picture);
            }


            try {
                const response = await axios.put("http://localhost:3000/api/reviews/", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                console.log("Review submitted:", response.data);
                alert("Review submitted successfully!");
                navigate(-1);
            } catch (error) {
                console.error("Error submitting review:", error);
                alert("An error occurred while submitting the review.");
            }
        }, 0); // Small delay to ensure latest rating value
    };

    return review && (
        <>
            <Header isAuth={true} />
            <Main>
                <div className={styles.mainContainer}>
                    <div className={styles.spacer}></div>
                    <div className={styles.bodyContainer}>
                        <form onSubmit={handleSubmit} className={styles.reviewSection} style={{ width: "100%" }}>
                            <h2 className={styles.titleText}>Create a Review</h2>
                            <div className={styles.splitContainer}>
                                <AlbumInfo Album={album} />
                                <div className={styles.reviewSection}>
                                    <input
                                        type="text"
                                        name="title"
                                        className={styles.reviewTitle}
                                        placeholder="Title of your review"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                    <textarea
                                        name="review"
                                        className={styles.reviewText}
                                        placeholder="Write your review here..."
                                        value={formData.review}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className={styles.uploadLabel}>
                                        <input
                                            type="file"
                                            name="picture"
                                            className={styles.uploadInput}
                                            hidden
                                            onChange={handleChange}
                                            accept="image/*"
                                        />
                                        Upload Files
                                    </label>
                                    {review.picture && <p className={styles.fileName}>{review.picture.name}</p>}
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
                            <button type="submit" className={styles.submitButton}>
                                Submit Review
                            </button>
                        </form>
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

export default UpdateReview;