import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./Artist.module.css";
import Loading from "../../components/Loading/Loading.jsx";
import Header from "../../components/Header/Header.jsx";
import Main from "../../components/Main";

import ArtistDetailsEditable from "../../components/Details/ArtistDetailsEditable.jsx"; 
import ArtistAlbumsEditable from "../../components/ArtistAlbums/ArtistAlbumsEditable.jsx";

function Artist() {
    const { username } = useParams();
    const [artistData, setArtistData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [album, setAlbum] = useState(null);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                const apiUrl = `${apiBaseUrl}/artist/${username}`;
                const artistResponse = await axios.get(apiUrl);
                setArtistData(artistResponse.data);

                const albumResponse = await axios.get(`${apiBaseUrl}/albums`);

                const filteredAlbums = albumResponse.data.filter(album => 
                    album.artist_id === artistResponse.data._id
                );
                setAlbum(filteredAlbums);
            } catch (err) {
                console.error("Error fetching artist:", err.response ? err.response.data : err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArtistData();
    }, [username, apiBaseUrl]);

    useEffect(() => {
        console.log("Updated artistData state:", artistData);
    }, [artistData]);

    if (loading) {
        return (
            <div>
                <Header isAuth={true} />
                <Loading />
            </div>
        );
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
                            <ArtistAlbumsEditable Albums={album}/>
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
}

export default Artist;