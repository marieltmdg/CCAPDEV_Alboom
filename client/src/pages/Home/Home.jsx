import Header from "../../components/Header/Header.jsx"
import Main from "../../components/Main"
import AlbumGrid from "../../components/AlbumGrid/AlbumGrid.jsx"

import alboom from '../../assets/alboom.png'

import styles from './Home.module.css'
import Search from '../../components/Search/Search.jsx'

import axios from "axios"
import { useEffect, useState } from "react"

function Home() {

    const [albums, setAlbums] = useState([])
    const [filteredAlbums, setFilteredAlbums] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/albums")
            .then(res => {
                setAlbums(res.data); // Set the albums state
                setFilteredAlbums(res.data); // Set the filteredAlbums state with the same data
            })
            .catch(err => console.error("Error fetching albums:", err));
    }, []);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filtered = albums.filter((album) =>
            album.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAlbums(filtered); 
    };

    return albums && (
        <>
            <Header isAuth={false} />
            <Main>
                <img src={alboom} alt="album" className={styles.alboom}/>

                <div className={styles.row}>
                    <Search onSearch={handleSearch}/>
                </div>

                <hr></hr>
                
                <AlbumGrid albums={filteredAlbums}/>
            </Main>
        </>
    )    
}

export default Home