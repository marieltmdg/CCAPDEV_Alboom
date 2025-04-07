import { useParams } from "react-router-dom";
import { useAuth } from "../../authContext.jsx";
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
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false); 
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [filterByNumber, setFilterByNumber] = useState(""); 
    const { authState} = useAuth(); // Get setAuthState from context

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
                const userResponse = await axios.get(`${apiBaseUrl}/user/${authState.user.username}`);
                setUserData(userResponse.data);
                console.log("User data:", userResponse.data);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        fetchAlbumData();
        fetchReviewsData();

        if (authState.authenticated && authState.user) {
            fetchUserData();
        }
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

    const sortByHighestRating = () => {
        const sorted = [...reviews].sort((a, b) => {
            return b.rating - a.rating;  
        });
        setReviews(sorted);
    };
    
    const sortByLowestRating = () => {
        const sorted = [...reviews].sort((a, b) => {
            return a.rating - b.rating;  
        });
        setReviews(sorted);
    };
    
    const handleFilterByNumber = () => {
        const filtered = originalReviews.filter((review) => {
            return review.rating === parseInt(filterByNumber, 10);  
        });
        setReviews(filtered);
    };
    
    const resetFilter = () => {
        setFilterByNumber('');  
        setReviews(originalReviews);  
    };

    const toggleFilterMenu = () => {
        if (isFilterMenuOpen) {
            setIsFadingOut(true);
            setTimeout(() => {
                setIsFadingOut(false);
                setIsFilterMenuOpen(false); 
            }, 200); 
        } else {
            setIsFilterMenuOpen(true); 
        }
    };

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
                        <div className={styles.filter} onClick={toggleFilterMenu}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12H16M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19H20M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                {(isFilterMenuOpen || isFadingOut) && (
                    <div
                        className={`${styles.filterMenu} ${
                            isFadingOut ? styles.fadeOut : styles.fadeIn
                        }`}
                    >
                        <div className={styles.close} onClick={toggleFilterMenu}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#ffffff"></path> </g></svg>
                        </div>
                        <h1>Sort</h1>
                        <div className={styles.buttonFilter} onClick={sortByHighestRating}>Highest to Lowest Booms</div>
                        <div className={styles.buttonFilter} onClick={sortByLowestRating}>Lowest to Highest Booms</div>
                        <h1>Filter</h1>
                        <input
                            type="number"
                            id="filterByNumber"
                            className={styles.booms}
                            placeholder="Input Number of Booms"
                            value={filterByNumber}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value >= 0 && value <= 5) {
                                    setFilterByNumber(value); 
                                }
                            }} 
                        />
                        <div className={styles.buttonFilter} onClick={handleFilterByNumber}> Number of Booms </div>
                        <div className={styles.buttonAlt} onClick={resetFilter}> Reset Filter </div>
                    </div>
                )}
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