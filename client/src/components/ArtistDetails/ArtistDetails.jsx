import React, { useEffect, useState } from "react";
import styles from "./ArtistDetails.module.css";
import linkIcon from "../../assets/link.png";
import pin from "../../assets/pin.png";

import avatar from "../../assets/users/default.jpg";
import kendrick from "../../assets/artists/kendrick.jpg";
import doechii from "../../assets/artists/doechii.jpg";
import tyler from "../../assets/artists/tyler.jpg";

const mockUserData = [
    {
        username: "kendrick-lamar",
        name: "Kendrick Lamar",
        bio: "Music enthusiast and avid concert-goer.",
        country: "United States",
        link: "https://example.com/kendrick",
        imgLink: kendrick
    },
    {
        username: "tyler,-the-creator",
        name: "Tyler The Creator",
        bio: "Lover of all things rock and roll.",
        country: "Canada",
        link: "https://example.com/tyler",
        imgLink: tyler
    },
    {
        username: "doechii",
        name: "doechii",
        bio: "DENIAL IS A RIVER.",
        country: "United Kingdom",
        link: "https://example.com/doechii",
        imgLink: doechii
    }
];

function ArtistDetails({ username }) {
    const [userData, setUserData] = useState({
        name: "Default Name",
        bio: "This is a default bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        country: "Default Country",
        link: "https://defaultlink.com",
        imgLink: avatar
    });

    useEffect(() => {
        const user = mockUserData.find(user => user.username === username);
        if (user) {
            setUserData(user);
        } else {
            console.error('User not found');
        }
    }, [username]);

    return (
        <div className={styles.userProfileContainer}>
            <div className={styles.profilePictureContainer}>
                <img src={userData.imgLink || avatar} className={styles.profilePictureImage} alt="Profile" />
            </div>

            <div className={styles.profileNameContainer}>
                <span className={styles.profileName}>{userData.name}</span>
                <div className={styles.artistText}>Artist</div>
            </div>

            <div className={styles.profileBioContainer}>
                <span className={styles.profileBio}>{userData.bio}</span>
            </div>
            
            <div className={styles.countryContainer}>
                <img src={pin} className={styles.countryImage} alt="Location" />
                <span className={styles.country}>{userData.country}</span>
            </div>

            <div className={styles.linkContainer}>
                <img src={linkIcon} className={styles.linkImage} alt="Link" />
                <a href={userData.link} className={styles.link} target="_blank" rel="noopener noreferrer">
                    {userData.link}
                </a>
            </div>

        </div>
    );
}

export default ArtistDetails;