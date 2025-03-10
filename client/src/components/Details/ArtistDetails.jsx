import React from "react";
import styles from "./Details.module.css";
import avatar from "../../assets/avatar.png";
import pin from "../../assets/pin.png";
import linkIcon from "../../assets/link.png";

function ArtistDetails({ artistData }) {
    if (!artistData) {
        return <div>Loading...</div>;
    }
                
    return (
        <div className={styles.userProfileContainer}>
            <div className={styles.profilePictureContainer}>
                <img src={artistData.picture ? `http://localhost:3000/${artistData.picture}` : avatar} className={styles.profilePictureImage} alt="Profile Picture" />
            </div>

            <div className={styles.profileNameContainer}>
                <span className={styles.profileName}>{artistData.name}</span>
            </div>

            <div className={styles.profileBioContainer}>
                <span className={styles.profileBio}>{artistData.bio}</span>
            </div>

            <div className={styles.countryContainer}>
                <img src={pin} className={styles.countryImage} alt="Location" />
                <span className={styles.country}>{artistData.country}</span>
            </div>

            <div className={styles.linkContainer}>
                <img src={linkIcon} className={styles.linkImage} alt="Link" />
                <a href={artistData.link} className={styles.link} target="_blank" rel="noopener noreferrer">
                    {artistData.link}
                </a>
            </div>
        </div>
    );
}

export default ArtistDetails;
