import { useParams } from "react-router-dom"

import styles from './Album.module.css'

import Main from "../../components/Main.jsx"

import Header from "../../components/Header/Header.jsx"
import AlbumReview from "../../components/AlbumReview/AlbumReview.jsx"
import ReviewCard from "../../components/ReviewCard/ReviewCard.jsx"
import search from '../../assets/search.png'

import axios from "axios"
import { useEffect, useState } from "react"

function Album() {
    const { id } = useParams()

    const [album, setAlbum] = useState(null)
    const [reviews, setReviews] = useState(null) 
    const [originalReviews, setOriginalReviews] = useState(null)
    const [rating, setRating] = useState(0)

    useEffect(() => {
        axios.get("http://localhost:3000/api/albums/" + id)
            .then(albumResponse => setAlbum(albumResponse.data))
            .catch(err => console.error("Error fetching album:", err))

        axios.get("http://localhost:3000/api/reviews/album/" + id)
            .then(reviewsResponse => {
                setReviews(reviewsResponse.data)
                setOriginalReviews(reviewsResponse.data)
                const sum = reviewsResponse.data.reduce((acc, review) => acc + review.rating, 0)
                const averageRating = reviewsResponse.data.length > 0 ? sum / reviewsResponse.data.length : 0
                setRating(averageRating)
            })
            .catch(err => console.error("Error fetching reviews:", err))
    }, [id])

    const handleDelete = async (userID, albumID) => {
        await axios.delete("http://localhost:3000/api/reviews/user/" + userID + "/album/" + albumID)
        setReviews(reviews.filter(review => review.user_id._id !== userID))
        setOriginalReviews(originalReviews.filter(review => review.user_id._id !== userID))
    }

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();

        if (searchTerm === "") {
            setReviews(originalReviews)
        } else {
            const filteredReviews = originalReviews.filter(review =>
                review.review_text.toLowerCase().includes(searchTerm) || review.title.toLowerCase().includes(searchTerm)
            )
            setReviews(filteredReviews)
        }
    }

    const handleUpvote = async (reviewId) => {
        try {
            const response = await axios.patch("http://localhost:3000/api/reviews/upvote/" + reviewId)

            setReviews(reviews.map(review =>
                review._id === reviewId ? { ...review, upvotes: response.data.upvotes } : review
            ))
        } catch (err) {
            console.error("Error upvoting review:", err);
        }
    }

    const handleDownvote = async (reviewId) => {
        try {
            const response = await axios.patch("http://localhost:3000/api/reviews/downvote/" + reviewId)

            setReviews(reviews.map(review =>
                review._id === reviewId ? { ...review, downvotes: response.data.downvotes } : review
            ))
        } catch (err) {
            console.error("Error downvoting review:", err);
        }
    }

    return album && (
        <>
            <Header isAuth={true} />
            <Main>
                <AlbumReview 
                    AlbumTitle={album.title} 
                    AlbumCover={album.cover} 
                    AlbumRating={rating}  
                    AlbumArtist={album.artist_id.artistname} 
                    AlbumReleaseDate={album.release_date} 
                    AlbumDescription={album.description}/>
                <h1>Reviews</h1>
                <div className={styles.searchContainer}>
                    <input onChange={(event) => handleSearch(event)} className={styles.search} type="search" size="1" placeholder="Search Reviews..." />
                    <button className={styles.button}>
                        <img src={search} className={styles.icon} />
                    </button>
                </div>
                {
                    reviews && reviews.map(review => (
                        <ReviewCard 
                            Key={review._id}
                            Album={album}
                            Review={review}
                            Delete={handleDelete}
                            Upvote={handleUpvote}
                            Downvote={handleDownvote}
                            IsEdited={true} 
                            IsReviewEditable={true}  
                        />
                    ))
                }
            </Main>
        </>
    )
}

export default Album