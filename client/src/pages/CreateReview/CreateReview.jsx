import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import Main from "../../components/Main.jsx";
import logo from "../../assets/logo.png";
import logoDark from "../../assets/logoDark.png";
import back from '../../assets/back.svg';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AlbumInfo from "../../components/AlbumInfo/AlbumInfo.jsx";
import styles from "./CreateReview.module.css";
import axios from "axios";

function CreateReview() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const navigate = useNavigate();

    const [album, setAlbum] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        review: '',
        file: null, // Use null for file initially
    });

    const { id } = useParams();
    console.log("ID IS " + id);

    useEffect(() => {
        axios.get("http://localhost:3000/api/albums/" + id)
            .then(albumResponse => setAlbum(albumResponse.data))
            .catch(err => console.error("Error fetching album:", err));
    }, [id]);

    // Handle changes in input fields
    const handleChange = (event) => {
        const { name, value, files } = event.target;

        // If the input is a file, use the first file in the files array
        if (name === "file") {
            setFormData({
                ...formData,
                [name]: files[0], // Store the file object
            });
        } else {
            // For other inputs, update the state with the value
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a FormData object to send files and other data
        const data = new FormData();
        data.append("title", formData.title);
        data.append("review", formData.review);
        data.append("file", formData.file); // Append the file

        try {
            const response = await axios.post("http://localhost:3000/api/reviews/", data, {
                headers: {
                    "Content-Type": "multipart/form-data", // Required for file uploads
                },
            });
            console.log("Review submitted successfully:", response.data);
            alert("Review submitted successfully!");
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("An error occurred while submitting the review.");
        }
    };

    return (
        <>
            <Header isAuth={true} />
            <Main>
                <div className={styles.mainContainer}>
                    <div className={styles.spacer}></div>
                    <div className={styles.bodyContainer}>
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
                                />
                                <textarea
                                    name="review"
                                    className={styles.reviewText}
                                    placeholder="Write your review here..."
                                    value={formData.review}
                                    onChange={handleChange}
                                />
                                <label className={styles.uploadLabel}>
                                    <input
                                        type="file"
                                        name="file"
                                        className={styles.uploadInput}
                                        hidden
                                        onChange={handleChange}
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
                        <button type="submit" className={styles.submitButton} onClick={handleSubmit}>
                            Submit Review
                        </button>
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