import { useParams } from "react-router-dom"

import styles from './Album.module.css'

import Main from "../../components/Main.jsx"

import Header from "../../components/Header/Header.jsx"
import AlbumReview from "../../components/AlbumReview/AlbumReview.jsx"
import ReviewCard from "../../components/ReviewCard/ReviewCard.jsx"

import userPhoto1 from '../../assets/users/userPhoto1.jpg'
import userPhoto2 from '../../assets/users/userPhoto2.jpg'
import userPhoto3 from '../../assets/users/userPhoto3.jpg'
import search from '../../assets/search.png'

const sampleReview1 = "This album isn’t just music—it’s a cosmic revelation, a brain-melting, soul-transcending masterpiece that reshapes reality with every note. Each sound feels like it was handcrafted by celestial beings, designed to rewire neurons and bend time itself. Listening isn’t just hearing—it’s ascending to a higher plane."
const sampleReview2 = "This album is like a midnight rendezvous—each track hits you like a whispered secret, smooth and slow, making you feel things you didn’t know you needed. The beats are so deep they’ll have you begging for more, like a lover who knows exactly how to tease and please with every drop."
const sampleReview3 = "This album is Endgame-level—each track smacks like a charged creeper, leaving you in a Minecraft trance."



import axios from "axios"
import { useEffect, useState } from "react"

function Album() {
    const { id } = useParams()

    const [album, setAlbum] = useState(null)
    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:3000/api/albums/" + id)
            .then(res => setAlbum(res.data))
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
                <ReviewCard Rating={5} Username="CarlegendelosReyes" UserPhoto={userPhoto1} UserReviewText={sampleReview1} IsEdited={true} IsReviewEditable={true} HasReply={true} Selected={album}/>
                <ReviewCard Rating={4} Username="ZappoTheDragon" UserPhoto={userPhoto2} UserReviewText={sampleReview2}/>
                <ReviewCard Rating={4} Username="GOKAN-san" UserPhoto={userPhoto3} UserReviewText={sampleReview3}/>
            </Main>
        </>
    )
}

export default Album