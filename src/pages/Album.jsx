import { useParams } from "react-router-dom"

import Header from "../components/Header/Header.jsx"
import AlbumReview from "../components/AlbumReview/AlbumReview.jsx"
import Main from "../components/Main"

function Album() {
    const { title } = useParams()

    return (
        <>
            <Header isAuth={true} />
            <Main>
                <AlbumReview/>
            </Main>
        </>
    ) 
}

export default Album