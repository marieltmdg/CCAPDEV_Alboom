import { useParams } from "react-router-dom"

import Header from "../components/Header"
import Main from "../components/Main"

function Album() {
    const { title } = useParams()

    return (
        <>
            <Header />
            <Main>
                Place Album Page Components Here!
            </Main>
        </>
    ) 
}

export default Album