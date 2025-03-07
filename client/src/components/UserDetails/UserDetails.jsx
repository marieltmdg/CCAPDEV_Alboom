import React from "react";
import styles from "./UserDetails.module.css";
import avatar from "../../assets/avatar.png";

function UserDetails({  userData }) {
    console.log("Final Image URL:", userData.picture ? `http://localhost:3000${userData.picture}` : avatar);

    if (!userData) {
        return <div>Loading...</div>;
    }
                
    return (
        <div className={styles.userProfileContainer}>
            <div className={styles.profilePictureContainer}>
                <img src={userData.picture ? `http://localhost:3000/${userData.picture}` : avatar} className={styles.profilePictureImage} alt="Profile Picture" />
            </div>

            <div className={styles.profileNameContainer}>
                <span className={styles.profileName}>{userData.username}</span>
            </div>

            <div className={styles.profileBioContainer}>
                <span className={styles.profileBio}>{userData.bio}</span>
            </div>
        </div>
    );
}

export default UserDetails;