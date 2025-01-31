import React from "react";
import styles from "./UserProfile.module.css";

import linkIcon from "../../assets/link.png";
import pin from "../../assets/pin.png";
import avatar from "../../assets/avatar.png";

function UserProfile(props) {
    return (
        <div className={styles.userProfileContainer}>
            <div className={styles.profilePictureContainer}>
                <img src={props.imgLink || avatar} className={styles.profilePictureImage} alt="Profile" />
            </div>

            <div className={styles.profileNameContainer}>
                <span className={styles.profileName}>{props.name}</span>
            </div>

            <div className={styles.profileBioContainer}>
                <span className={styles.profileBio}>{props.bio}</span>
            </div>

            <div className={styles.countryContainer}>
                <img src={pin} className={styles.countryImage} alt="Location" />
                <span className={styles.country}>{props.country}</span>
            </div>

            <div className={styles.linkContainer}>
                <img src={linkIcon} className={styles.linkImage} alt="Link" />
                <a href={props.link} className={styles.link} target="_blank" rel="noopener noreferrer">
                    {props.link}
                </a>
            </div>
        </div>
    );
}

UserProfile.defaultProps = {
    name: "Default Name",
    bio: "This is a default bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    country: "Default Country",
    link: "https://defaultlink.com",
    imgLink: avatar,
};

export default UserProfile;
