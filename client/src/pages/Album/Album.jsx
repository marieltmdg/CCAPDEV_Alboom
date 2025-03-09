import { useParams } from "react-router-dom"

import styles from './Album.module.css'

import Main from "../../components/Main.jsx"

import Header from "../../components/Header/Header.jsx"
import AlbumReview from "../../components/AlbumReview/AlbumReview.jsx"
import search from '../../assets/search.png'

import axios from "axios"
import { useEffect, useState } from "react"

function Album() {
    const { id } = useParams()

    const [album, setAlbum] = useState(null)
    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:3000/api/albums/" + id)
            .then(albumResponse => setAlbum(albumResponse.data))

        axios.get("http://localhost:3000/api/reviews/album/" + id)
            .then(reviewsResponse => setReviews(reviewsResponse.data))
    }, [id])

    return album && (
        <>
            <Header isAuth={true} />
            <Main>
                <AlbumReview AlbumTitle={album.title} AlbumCover={album.cover} AlbumRating="5" ArtistLink={album.artist_id._id} AlbumArtist={album.artist_id.artistname} AlbumReleaseDate={album.release_date} AlbumDescription={album.description}/>
                <h1>Reviews</h1>
                <div className={styles.searchContainer}>
                    <input className={styles.search} type="search" size="1" placeholder="Search Reviews..." />
                    <button className={styles.button}>
                        <img src={search} className={styles.icon} />
                    </button>
                </div>
                {
                    reviews && reviews.map(review => (
                        <div>Test</div>
                    ))
                }
            </Main>
        </>
    )
}

export default Album