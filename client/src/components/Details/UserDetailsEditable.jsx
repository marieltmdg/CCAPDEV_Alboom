import React, { useEffect, useState } from "react";
import styles from "./Details.module.css";
import linkIcon from "../../assets/link.png";
import pin from "../../assets/pin.png";
import avatar from "../../assets/avatar.png";
import { useParams } from "react-router-dom";

function UserDetailsEditable({ userData}) {
    const {username} = useParams();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: userData?.username || "",
        bio: userData?.bio || "",
        country: userData?.country || "",
        link: userData?.link || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/${username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error("Failed to update user");
            }
    
            const updatedUser = await response.json();
            setUser(updatedUser);
            setIsEditing(false);
            
            window.location.reload();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    if (!userData) return <div>Loading...</div>;

    return (
        <div className={styles.userProfileContainer}>
            <div className={styles.profilePictureContainer}>
                <img src={userData.picture ? `http://localhost:3000/${userData.picture}` : avatar} className={styles.profilePictureImage} alt="Profile Picture" />
            </div>
            {isEditing ? (
                <div className={styles.editForm}>
                    <div className={styles.profileNameContainerEditing}>
                        <span className={styles.profileName}>{userData.username}</span>
                    </div>
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
                    <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>Cancel</button>
                </div>
            ) : (
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

                    <button onClick={() => setIsEditing(true)} className={styles.editButton}>Edit</button>
                    
                </div>
                
            )}
        </div>
    );
}

export default UserDetailsEditable;