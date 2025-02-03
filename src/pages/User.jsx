import { useParams } from "react-router-dom"

import styles from "./User.module.css"

import Header from "../components/Header/Header.jsx"
import Main from "../components/Main"

import UserDetails from '../components/UserDetails/UserDetails.jsx';
import UserDetailsEditable from '../components/UserDetailsEditable/UserDetailsEditable.jsx';
import UserLatestReview from '../components/UserLatestReview/UserLatestReview.jsx';
import UserReviews from '../components/UserReviews/UserReviews.jsx';

function User({ currentUser }) {
    const { username } = useParams();

    return (
        <>
            <Header isAuth={true} />
            <Main>
                <div className={styles.mainContainer}>
                    {/* insert currentUser*/}
                    {username === currentUser ? (
                        <UserDetailsEditable username={username} />
                    ) : (
                        <UserDetails username={username} />
                    )}

                    <div className={styles.reviewsContainer}>
                        <div className={styles.latestReviewContainer}>
                            <UserLatestReview username={username} />
                        </div>
                        <div className={styles.userReviewContainer}>
                            <UserReviews username={username} />
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
}

export default User;