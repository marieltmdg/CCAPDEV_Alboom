import './AlbumGrid.css'

import { Link } from 'react-router-dom'

const albums = [
    { name: 'Album 0' },
    { name: 'Album 1' },
    { name: 'Album 2' },
    { name: 'Album 3' },
    { name: 'Album 4' },
];

function AlbumGrid() {
    return (
        <div className="grid-container">
            {albums.map(album => (
                <Link to={"/album/" + album.name} key={album.name} className="grid-item">

                </Link>
            ))}
        </div>
    )
}

export default AlbumGrid