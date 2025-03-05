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
        imgLink: doechii
    },
    {
        username: "doechii",
        name: "doechii",
        bio: "DENIAL IS A RIVER.",
        country: "United Kingdom",
        link: "https://example.com/doechii",
        imgLink: tyler
    }
];

function ArtistDetailsEditable({ username }) {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        country: "",
        link: ""
    });

    useEffect(() => {
        const userData = mockUserData.find(user => user.username === username);
        if (userData) {
            setUser(userData);
            setFormData({
                name: userData.name,
                bio: userData.bio,
                country: userData.country,
                link: userData.link
            });
        }
    }, [username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        setUser(prevState => ({
            ...prevState,
            ...formData
        }));
        setIsEditing(false);
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className={styles.userProfileContainer}>
            <div className={styles.profilePictureContainer}>
                <img src={user.imgLink || avatar} alt="User Avatar" className={styles.profilePictureImage} />
            </div>
            {isEditing ? (
                <div className={styles.editForm}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.inputName}
                    />
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className={styles.inputBio}
                    />
                    <div className={styles.countryContainer}>
                        <img src={pin} alt="Country" className={styles.countryImage} /> 
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className={styles.inputCountry}
                        />
                    </div>
                    <div className={styles.linkContainer}>
                        <img src={linkIcon} alt="Link" className={styles.linkImage} />
                    
                        <input
                            type="text"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            className={styles.inputLink}
                        />
                    </div>
                    <button onClick={handleSave} className={styles.saveButton}>Save</button>
                </div>
            ) : (
                <div className={styles.details}>
                    <div className={styles.profileNameContainer}>
                        <span className={styles.profileName}>{user.name}</span>
                        <div className={styles.artistText}>Artist</div>
                    </div>
                    <div className={styles.profileBioContainer}>
                        <p className={styles.profileBio}>{user.bio}</p>
                    </div>
                    <button onClick={() => setIsEditing(true)} className={styles.editButton}>Edit</button>
                </div>
            )}
        </div>
    );
}

export default ArtistDetailsEditable;