import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./User.module.css";
import Loading from "../../components/Loading/Loading.jsx";
import Header from "../../components/Header/Header.jsx";
import Main from "../../components/Main";

import UserDetailsEditable from '../../components/Details/UserDetailsEditable.jsx';
import UserLatestReview from '../../components/UserLatestReview/UserLatestReview.jsx';
import UserReviews from '../../components/UserReviews/UserReviews.jsx';

function User() {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; 

    console.log("Current user:", username);
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const apiUrl = `${apiBaseUrl}/user/${username}`;
                console.log("Fetching user data from:", apiUrl);
                
                const response = await axios.get(apiUrl);
                setUserData(response.data);
            } catch (err) {
                console.error("Error fetching user:", err.response ? err.response.data : err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [username, apiBaseUrl]);

    useEffect(() => {
        console.log("Updated userData state:", userData);
    }, [userData]);

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
                        <UserDetailsEditable userData={userData} />
                    </div>

                    <div className={styles.reviewsContainer}>
                        <div className={styles.latestReviewContainer}>
                            <UserLatestReview userData={userData} />
                        </div>
                        <div className={styles.userReviewContainer}>
                            <UserReviews userData={userData} />
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
}

export default User;