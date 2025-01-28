import { useParams } from "react-router-dom"

import Headerout from "../components/Headerout"
import Main from "../components/Main"

function Album() {
    const { title } = useParams()

    return (
        <>
            <Headerout />
            <Main>
                Place Album Page Components Here!
            </Main>
        </>
    ) 
}

export default Album