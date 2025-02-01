import { useParams } from "react-router-dom"

import styles from "./User.module.css"

import Header from "../components/Header/Header.jsx"
import Main from "../components/Main"

import UserProfile from '../components/UserDetails/UserProfile.jsx';
import UserReviews from '../components/UserReviews/UserReviews.jsx';

function User() {
    const { username } = useParams();

    return (
        <>
            <Header isAuth={true} />
            <Main>
                <div className={styles.mainContainer}>
                    <UserProfile username={username}/>

                    <div className={styles.reviewsContainer}>
                        <div className={styles.latestReviewContainer}>
                            {/* <LatestReview /> */}
                        </div>
                        <div className={styles.userReviewContainer}>
                            <UserReviews username={username}/>
                        </div>
                    </div>

                </div>
            </Main>
        </>
    );
}

export default User;