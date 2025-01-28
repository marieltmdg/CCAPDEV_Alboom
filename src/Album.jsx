import { useParams } from "react-router-dom"

function Album() {
    const { title } = useParams()

    return <h1>Album {title}</h1>
}

export default Album