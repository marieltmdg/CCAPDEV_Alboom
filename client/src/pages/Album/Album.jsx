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
    const [rating, setRating] = useState(0)

    useEffect(() => {
        axios.get("http://localhost:3000/api/albums/" + id)
            .then(albumResponse => setAlbum(albumResponse.data))
            .catch(err => console.error("Error fetching album:", err));
    
        axios.get("http://localhost:3000/api/reviews/album/" + id)
            .then(reviewsResponse => {
                setReviews(reviewsResponse.data); 
                const sum = reviewsResponse.data.reduce((acc, review) => acc + review.rating, 0);
                const averageRating = reviewsResponse.data.length > 0 ? sum / reviewsResponse.data.length : 0;
                setRating(averageRating); 
            })
    }, [id]);


    return album && (
        <>
            <Header isAuth={true} />
            <Main>
                <AlbumReview 
                    AlbumTitle={album.title} 
                    AlbumCover={album.cover} 
                    AlbumRating={rating} 
                    ArtistLink={album.artist_id._id} 
                    AlbumArtist={album.artist_id.artistname} 
                    AlbumReleaseDate={album.release_date} 
                    AlbumDescription={album.description}/>
                <h1>Reviews</h1>
                <div className={styles.searchContainer}>
                    <input className={styles.search} type="search" size="1" placeholder="Search Reviews..." />
                    <button className={styles.button}>
                        <img src={search} className={styles.icon} />
                    </button>
                </div>
                {
                    reviews && reviews.map(review => (
                        <ReviewCard 
                            Rating={review.rating} 
                            Username={review.username}
                            UserPhoto={"http://localhost:3000/" + review.user_id.picture} 
                            UserReviewText={review.review_text} 
                            Upvotes={review.upvotes}
                            Downvotes={review.downvotes}
                            ReviewTitle={review.title}
                            IsEdited={true} 
                            IsReviewEditable={true} 
                            HasReply={review.reply_text} 
                            Selected={album}/>
                    ))
                }
            </Main>
        </>
    )
}

export default Album