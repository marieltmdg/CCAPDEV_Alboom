import Header from "../../components/Header/Header.jsx";
import Main from "../../components/Main";
import AlbumGrid from "../../components/AlbumGrid/AlbumGrid.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import alboom from '../../assets/alboom.png';

import styles from './Home.module.css';
import Search from '../../components/Search/Search.jsx';

import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
    const [albums, setAlbums] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        axios.get(`${apiBaseUrl}/albums`)
            .then(res => {
                setAlbums(res.data);
                setFilteredAlbums(res.data); 
            })
            .catch(err => console.error("Error fetching albums:", err));
    }, [apiBaseUrl]);

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
                <img src={alboom} alt="album" className={styles.alboom} />

                <div className={styles.row}>
                    <h2>Search Albums</h2>
                    <Search onSearch={handleSearch} />
                </div>

                <hr></hr>
                
                <AlbumGrid albums={filteredAlbums} />
            </Main>
            <Footer />
        </>
    );
}

export default Home;