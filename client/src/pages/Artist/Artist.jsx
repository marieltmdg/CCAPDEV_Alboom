import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./Artist.module.css";

import Header from "../../components/Header/Header.jsx";
import Main from "../../components/Main";

import ArtistDetails from "../../components/Details/ArtistDetails.jsx";
import ArtistDetailsEditable from "../../components/Details/ArtistDetailsEditable.jsx"; 
import ArtistAlbums from "../../components/ArtistAlbums/ArtistAlbums.jsx";

function Artist() {
    const { artistname } = useParams();
    const [artistData, setArtistData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("Current artist:", artistname);
    
    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                const apiUrl = `/api/artist/${artistname}`;
                
                const response = await axios.get(apiUrl);
                setArtistData(response.data);
            } catch (err) {
                console.error("Error fetching artist:", err.response ? err.response.data : err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArtistData();
    }, [artistname]);

    useEffect(() => {
        console.log("Updated artistData state:", artistData);
    }, [artistData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Header isAuth={true} />
            <Main>
                <div className={styles.mainContainer}>
                    <div className={styles.userProfileContainer}>
                        <ArtistDetailsEditable artistData={artistData} />
                    </div>

                    <div className={styles.centerContainer}>
                        <div className={styles.albumsContainer}>
                            <ArtistAlbums artistname={artistname} />
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
}

export default Artist;
