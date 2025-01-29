import { useParams } from "react-router-dom"

import Header from "../components/Header/Header.jsx"
import Main from "../components/Main"

function User() {
    const { username } = useParams()

    return (
        <>
            <Header isAuth={true} />
            <Main>
                Place User Page Components Here!
            </Main>
        </>
    )
}

export default User