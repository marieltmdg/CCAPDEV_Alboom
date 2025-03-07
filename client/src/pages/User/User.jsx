import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./User.module.css";

import Header from "../../components/Header/Header.jsx";
import Main from "../../components/Main";

import UserDetails from '../../components/UserDetails/UserDetails.jsx';
import UserDetailsEditable from '../../components/UserDetails/UserDetailsEditable.jsx';
import UserLatestReview from '../../components/UserLatestReview/UserLatestReview.jsx';
import UserReviews from '../../components/UserReviews/UserReviews.jsx';

function User() {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("Current user:", username);
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const apiUrl = `/api/user/${username}`;
                console.log("Fetching user data from:", apiUrl);
                
                const response = await axios.get(apiUrl);
                setUserData(response.data);
                console.log("Retrieved user data:", response.data);
            } catch (err) {
                console.error("Error fetching user:", err.response ? err.response.data : err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [username]);

    useEffect(() => {
        console.log("Updated userData state:", userData);
    }, [userData]);

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
                        <UserDetails userData={userData} />
                    </div>

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
