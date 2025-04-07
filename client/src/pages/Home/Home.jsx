import { useEffect, useState, useMemo } from "react";
import Header from "../../components/Header/Header.jsx";
import Main from "../../components/Main";
import AlbumGrid from "../../components/AlbumGrid/AlbumGrid.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import alboom from '../../assets/alboom.png';

import styles from './Home.module.css';
import Search from '../../components/Search/Search.jsx';
import axios from "axios";

function Home() {
    const [albums, setAlbums] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [reviews, setReviews] = useState([]); 
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false); 
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [filterByNumber, setFilterByNumber] = useState(""); 

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchAlbumsAndReviews = async () => {
            try {
                const [albumsRes, reviewsRes] = await Promise.all([
                    axios.get(`${apiBaseUrl}/albums`),
                    axios.get(`${apiBaseUrl}/reviews`) 
                ]);
                setAlbums(albumsRes.data);
                setFilteredAlbums(albumsRes.data);
                setReviews(reviewsRes.data); 
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
    
        fetchAlbumsAndReviews();
    }, [apiBaseUrl]);

    const averageRatings = useMemo(() => {
        const grouped = reviews.reduce((acc, review) => {
            const albumId = review.album_id._id || review.album_id; 
            if (!acc[albumId]) acc[albumId] = [];
            acc[albumId].push(review.rating);
            return acc;
        }, {});
    
        return Object.entries(grouped).map(([albumId, ratings]) => {
            const total = ratings.reduce((sum, r) => sum + r, 0);
            const average = total / ratings.length;
            return {
                albumId,
                averageRating: average.toFixed(2),
            };
        });
    }, [reviews]);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filtered = albums.filter((album) =>
            album.title.toLowerCase().includes(searchTerm.toLowerCase()) || album.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAlbums(filtered); 
    };

    const sortByHighestRating = () => {
        const ratingMap = Object.fromEntries(
            averageRatings.map(({ albumId, averageRating }) => [albumId, parseFloat(averageRating)])
        );
    
        const sorted = [...albums].sort((a, b) => {
            const aRating = ratingMap[a._id] ?? 0;
            const bRating = ratingMap[b._id] ?? 0;
            return bRating - aRating; 
        });
    
        setFilteredAlbums(sorted);
    };
    
    const sortByLowestRating = () => {
        const ratingMap = Object.fromEntries(
            averageRatings.map(({ albumId, averageRating }) => [albumId, parseFloat(averageRating)])
        );
    
        const sorted = [...albums].sort((a, b) => {
            const aRating = ratingMap[a._id] ?? 0;
            const bRating = ratingMap[b._id] ?? 0;
            return aRating - bRating; 
        });
    
        setFilteredAlbums(sorted);
    };

    const handleFilterByNumber = () => {
        console.log(filterByNumber)
        const ratingMap = Object.fromEntries(
            averageRatings.map(({ albumId, averageRating }) => [albumId, parseFloat(averageRating)])
        );

        const filtered = albums.filter((album) => {
            const averageRating = ratingMap[album._id] ?? 0;
            return averageRating === parseFloat(filterByNumber);
        });
        setFilteredAlbums(filtered);
    };

    const toggleFilterMenu = () => {
        if (isFilterMenuOpen) {
            setIsFadingOut(true);
            setTimeout(() => {
                setIsFadingOut(false);
                setIsFilterMenuOpen(false); 
            }, 200); 
        } else {
            setIsFilterMenuOpen(true); 
        }
    };

    const resetFilter = () => {
        setFilterByNumber(''); 
        setFilteredAlbums(albums); 
    };

    return albums && (
        <>
            <Header isAuth={false} />
            <Main>
                <img src={alboom} alt="album" className={styles.alboom} />

                <div className={styles.row}>
                    <h2 className={styles.left}>Search Albums</h2>
                    <div className={styles.right}>
                        <Search onSearch={handleSearch} />
                        <div className={styles.filter} onClick={toggleFilterMenu}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12H16M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19H20M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {(isFilterMenuOpen || isFadingOut) && (
                    <div
                        className={`${styles.filterMenu} ${
                            isFadingOut ? styles.fadeOut : styles.fadeIn
                        }`}
                    >
                        <div className={styles.close} onClick={toggleFilterMenu}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#ffffff"></path> </g></svg>
                        </div>
                        <h1>Sort</h1>
                        <div className={styles.rowSort}>
                            <h2>Booms:</h2>
                            <div className={styles.smallButton} onClick={sortByHighestRating}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z" fill="#ffffff"></path> </g></svg>
                            </div>
                            <div className={styles.smallButton} onClick={sortByLowestRating}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3Z" fill="#ffffff"></path> </g></svg>
                            </div>
                        </div>
                        <h1>Filter</h1>
                        <input
                            type="number"
                            id="filterByNumber"
                            className={styles.booms}
                            placeholder="Input Number of Booms"
                            value={filterByNumber}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value >= 0 && value <= 5) {
                                    setFilterByNumber(value); 
                                }
                            }} 
                        />
                        <div className={styles.button} onClick={handleFilterByNumber}> Number of Booms </div>
                        <div className={styles.buttonAlt} onClick={resetFilter}> Reset Filter </div>
                    </div>
                )}

                <hr></hr>
                
                <AlbumGrid albums={filteredAlbums} />
            </Main>
            <Footer />
        </>
    );
}

export default Home;