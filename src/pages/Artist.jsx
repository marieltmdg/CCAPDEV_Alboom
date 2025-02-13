import { useParams } from "react-router-dom"

import styles from "./Artist.module.css"

import Header from "../components/Header/Header.jsx"
import Main from "../components/Main"

import ArtistDetails from "../components/ArtistDetails/ArtistDetails.jsx"
import ArtistDetailsEditable from "../components/ArtistDetailsEditable/ArtistDetailsEditable.jsx"
import ArtistAlbums from '../components/ArtistAlbums/ArtistAlbums.jsx';

function Artist({ currentUser }) {
    const { username } = useParams();

    return (
        <>
            <Header isAuth={true} />
            <Main>
                <div className={styles.mainContainer}>
                    {/* insert currentUser*/}
                    <div className={styles.userProfileContainer}>
                        {username === currentUser ? (
                            <ArtistDetailsEditable username={username} />
                        ) : (
                            <ArtistDetails username={username} />
                        )}
                    </div>

                    <div className={styles.centerContainer}>
                        <div className={styles.albumsContainer}>
                            <ArtistAlbums username={username} />
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
}

export default Artist;