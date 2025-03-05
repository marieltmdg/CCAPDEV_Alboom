import React, { useEffect, useState } from "react";
import styles from "./UserDetails.module.css";
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
    }
];

function UserDetailsEditable({ username }) {
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
                    <button onClick={handleSave} className={styles.saveButton}>Save</button>
                </div>
            ) : (
                <div className={styles.details}>
                    <div className={styles.profileNameContainer}>
                        <h2 className={styles.profileName}>{user.name}</h2>
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

export default UserDetailsEditable;