import { useParams } from "react-router-dom"

import Headerout from "../components/Headerout"
import Main from "../components/Main"

function User() {
    const { username } = useParams()

    return (
        <>
            <Headerout />
            <Main>
                Place User Page Components Here!
            </Main>
        </>
    )
}

export default User