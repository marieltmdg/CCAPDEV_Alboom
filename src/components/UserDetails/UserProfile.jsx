import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import linkIcon from "../../assets/link.png";
import pin from "../../assets/pin.png";
import avatar from "../../assets/avatar.png";
import userPhoto1 from "../../assets/users/UserPhoto1.jpg";
import userPhoto2 from "../../assets/users/UserPhoto2.jpg";
import userPhoto3 from "../../assets/users/UserPhoto3.jpg";

const mockUserData = [
    {
        username: "johndoe",
        name: "John Doe",
        bio: "Music enthusiast and avid concert-goer.",
        country: "United States",
        link: "https://example.com/johndoe",
        imgLink: userPhoto1
    },
    {
        username: "janedoe",
        name: "Jane Doe",
        bio: "Lover of all things rock and roll.",
        country: "Canada",
        link: "https://example.com/janedoe",
        imgLink: userPhoto3
    },
    {
        username: "musicfan",
        name: "Music Fan",
        bio: "Always on the lookout for new tunes.",
        country: "United Kingdom",
        link: "https://example.com/musicfan",
        imgLink: userPhoto2
    },
    {
        username: "concertlover",
        name: "Concert Lover",
        bio: "Live music is my passion.",
        country: "Australia",
        link: "https://example.com/concertlover",
        imgLink: avatar
    },
    {
        username: "vinylcollector",
        name: "Vinyl Collector",
        bio: "Collector of rare and vintage records.",
        country: "Germany",
        link: "https://example.com/vinylcollector",
        imgLink: avatar
    }
];

function UserProfile({ username }) {
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

export default UserProfile;