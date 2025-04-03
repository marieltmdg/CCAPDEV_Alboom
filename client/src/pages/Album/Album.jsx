import { useParams } from "react-router-dom";
import styles from './Album.module.css';
import Main from "../../components/Main.jsx";
import Header from "../../components/Header/Header.jsx";
import AlbumReview from "../../components/AlbumReview/AlbumReview.jsx";
import ReviewCard from "../../components/ReviewCard/ReviewCard.jsx";
import search from '../../assets/search.png';
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";

import { useEffect, useState } from "react";

function Album() {
    const { id } = useParams();

    const [album, setAlbum] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [originalReviews, setOriginalReviews] = useState(null);
    const [rating, setRating] = useState(-1);
    const [refresh, setRefresh] = useState(false);
    const [userData, setUserData] = useState(null);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchAlbumData = async () => {
            try {
                const albumResponse = await axios.get(`${apiBaseUrl}/albums/${id}`);
                setAlbum(albumResponse.data);
            } catch (err) {
                console.error("Error fetching album:", err);
            }
        };

        const fetchReviewsData = async () => {
            try {
                const reviewsResponse = await axios.get(`${apiBaseUrl}/reviews/album/${id}`);
                setReviews(reviewsResponse.data);
                setOriginalReviews(reviewsResponse.data);

                if (reviewsResponse.data.length === 0) {
                    setRating(-1); 
                } else {
                    const sum = reviewsResponse.data.reduce((acc, review) => acc + review.rating, 0);
                    const averageRating = sum / reviewsResponse.data.length;
                    setRating(averageRating);
                }
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        };

        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`${apiBaseUrl}/user/carlegendelosreyes`);
                setUserData(userResponse.data);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        fetchAlbumData();
        fetchReviewsData();
        fetchUserData();
    }, [id, refresh, apiBaseUrl]);

    const refreshReviews = () => {
        setRefresh(!refresh);
    };

    const handleDelete = async (reviewID) => {
        try {
            await axios.delete(`${apiBaseUrl}/reviews/${reviewID}`);
            setReviews(reviews.filter(review => review._id !== reviewID));
            setOriginalReviews(originalReviews.filter(review => review._id !== reviewID));
        } catch (err) {
            console.error("Error deleting review:", err);
        }
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();

        if (searchTerm === "") {
            setReviews(originalReviews);
        } else {
            const filteredReviews = originalReviews.filter(review =>
                review.review_text.toLowerCase().includes(searchTerm) || review.title.toLowerCase().includes(searchTerm)
            );
            setReviews(filteredReviews);
        }
    };

    const handleUpvote = async (reviewId) => {
        try {
            const response = await axios.patch(`${apiBaseUrl}/reviews/upvote/${reviewId}`);
            setReviews(reviews.map(review =>
                review._id === reviewId ? { ...review, upvotes: response.data.upvotes } : review
            ));
        } catch (err) {
            console.error("Error upvoting review:", err);
        }
    };

    const handleDownvote = async (reviewId) => {
        try {
            const response = await axios.patch(`${apiBaseUrl}/reviews/downvote/${reviewId}`);
            setReviews(reviews.map(review =>
                review._id === reviewId ? { ...review, downvotes: response.data.downvotes } : review
            ));
        } catch (err) {
            console.error("Error downvoting review:", err);
        }
    };

    if (!album) {
        return (
            <div>
                <Header isAuth={true} />
                <Loading />
            </div>
        );
    }

    return (
        <>
            <Header isAuth={true} />
            <Main>
                <AlbumReview 
                    Album={album}
                    Rating={rating}
                />
                <div className={styles.reviewHeader}>
                    <h2>Reviews</h2>
                    <div className={styles.searchContainer}>
                        <input onChange={(event) => handleSearch(event)} className={styles.search} type="search" size="1" placeholder="Search Reviews..." />
                        <button className={styles.button}>
                            <img src={search} className={styles.icon} alt="Search" />
                        </button>
                    </div>
                </div>
                {
                    reviews && reviews.length > 0 ? (
                        reviews.map(review => (
                            <ReviewCard 
                                key={review._id}
                                Album={album}
                                Review={review}
                                Delete={handleDelete}
                                Upvote={handleUpvote}
                                Downvote={handleDownvote}
                                IsEdited={review.isEdited} 
                                IsReviewEditable={true}
                                Refresh={refreshReviews}
                                userID={userData?._id}
                            />
                        ))
                    ) : (
                        <p className={styles.noReviews}>No reviews available. Be the first to write one!</p>
                    )
                }
            </Main>
        </>
    );
}

export default Album;