import { useParams } from "react-router-dom"

import styles from "./Artist.module.css"

import Header from "../components/Header/Header.jsx"
import Main from "../components/Main"

import ArtistDetails from "../components/ArtistDetails/ArtistDetails.jsx"
import ArtistDetailsEditable from "../components/ArtistDetails/ArtistDetailsEditable.jsx"
import ArtistAlbums from '../components/ArtistAlbums/ArtistAlbums.jsx';

function Artist({ currentUser }) {
    const { username } = useParams();

    return (
        <>
            <Header isAuth={true} />
            <Main>
                <div className={styles.mainContainer}>
                    <div className={styles.userProfileContainer}>
                        {username === currentUser ? (
                            <UserDetailsEditable username={username} />
                        ) : (
                            <UserDetails username={username} />
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