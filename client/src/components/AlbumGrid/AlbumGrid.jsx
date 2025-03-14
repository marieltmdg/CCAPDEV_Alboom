import styles from './AlbumGrid.module.css'

import { Link } from 'react-router-dom'

function AlbumGrid({albums}) {
 
    return (
        <div className={styles.container}>
            {albums.map(album => (
                <Link to={"/album/" + album._id} key={album._id} className={styles.item}><img src={"http://localhost:3000/" + album.cover} alt="" className={styles.cover} /></Link>
            ))}
        </div>
    )
}

export default AlbumGrid