import { useParams } from "react-router-dom"

import Main from "../components/Main"

import Header from "../components/Header/Header.jsx"
import AlbumReview from "../components/AlbumReview/AlbumReview.jsx"
import ReviewCard from "../components/ReviewCard/ReviewCard.jsx"

import userPhoto1 from '../assets/users/userPhoto1.jpg'
import userPhoto2 from '../assets/users/userPhoto2.jpg'
import userPhoto3 from '../assets/users/userPhoto3.jpg'

const sampleReview1 = "This album isn’t just music—it’s a cosmic revelation, a brain-melting, soul-transcending masterpiece that reshapes reality with every note. Each sound feels like it was handcrafted by celestial beings, designed to rewire neurons and bend time itself. Listening isn’t just hearing—it’s ascending to a higher plane."
const sampleReview2 = "This album is like a midnight rendezvous—each track hits you like a whispered secret, smooth and slow, making you feel things you didn’t know you needed. The beats are so deep they’ll have you begging for more, like a lover who knows exactly how to tease and please with every drop."
const sampleReview3 = "This album is Endgame-level—each track smacks like a charged creeper, leaving you in a Minecraft trance. The production hits harder than a diamond sword, while the beats are like obsidian, solid and unbreakable. You’ll be mining for more, stuck in an infinite loop of epic Redstone flows and Nether beats."


function Album() {
    const { title } = useParams()

    return (
        <>
            <Header isAuth={true} />
            <Main>
                <AlbumReview/>
                <h1>Popular Reviews</h1>
                <ReviewCard Rating={5} Username="CarlegendelosReyes" UserPhoto={userPhoto1} UserReviewText={sampleReview1} IsPopular={true}/>
                <h1>Reviews</h1>
                <ReviewCard Rating={4} Username="ZappoTheDragon" UserPhoto={userPhoto2} UserReviewText={sampleReview2}/>
                <ReviewCard Rating={4} Username="GOKAN-san" UserPhoto={userPhoto3} UserReviewText={sampleReview3}/>
            </Main>
        </>
    ) 
}

export default Album