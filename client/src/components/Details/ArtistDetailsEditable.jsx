import React, { useEffect, useState } from "react";
import styles from "./Details.module.css";
import linkIcon from "../../assets/link.png";
import pin from "../../assets/pin.png";
import avatar from "../../assets/users/default.jpg";
import { useParams } from "react-router-dom";

import upload from '../../assets/upload.svg';

function ArtistDetailsEditable({ artistData }) {
    const { artistname } = useParams();
    const [user, setUser] = useState(artistData || {});
    const [isEditing, setIsEditing] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [formData, setFormData] = useState({
        bio: artistData?.bio || "",
        country: artistData?.country || "",
        link: artistData?.link || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            const imagePreviewUrl = URL.createObjectURL(file);
            setFormData(prevState => ({
                ...prevState,
                picturePreview: imagePreviewUrl
            }));
        }
    };

    const handleSave = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("bio", formData.bio);
            formDataToSend.append("country", formData.country);
            formDataToSend.append("link", formData.link);
            if (photo) {
                formDataToSend.append("picture", photo);
            }

            const response = await fetch(`http://localhost:3000/api/artist/${artistname}`, {
                method: "PUT",
                body: formDataToSend, 
            });
    
            if (!response.ok) {
                throw new Error("Failed to update user");
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            setIsEditing(false);
            
            window.location.reload();
        } catch (error) {
            console.error("Error updating artist:", error);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className={styles.userProfileContainer}>

            {isEditing ? (
                <div className={styles.editForm}>
                    <div className={styles.profilePictureContainer}>
                        <label htmlFor="avatar" className={styles.avatar}>
                            <img 
                                id="preview"
                                src={formData.picturePreview || (artistData.picture ? `http://localhost:3000/${artistData.picture}` : avatar)} 
                                className={styles.profilePictureImage} 
                                alt="Avatar" 
                            />
                            <input type="file" id="avatar" accept="image/*" className={styles.upload} onChange={handleFileChange} />
                            <img src={upload} alt="Upload" className={styles.uploadIcon} />
                        </label>
                    </div>

                    <div className={styles.profileNameContainerEditing}>
                        <span className={styles.profileName}>{artistData.artistname}</span>
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
                <div className={styles.details}>
                    <div className={styles.profilePictureContainer}>
                        <img src={artistData.picture ? `http://localhost:3000/${artistData.picture}` : avatar} className={styles.profilePictureImage} alt="Profile Picture" />
                    </div>
                    <div className={styles.profileNameContainer}>
                        <span className={styles.profileName}>{user.artistname}</span>
                        <div className={styles.artistText}>Artist</div>
                    </div>
                    <div className={styles.profileBioContainer}>
                        <p className={styles.profileBio}>{user.bio}</p>
                    </div>

                    <div className={styles.countryContainer}>
                        <p><img src={pin} alt="Country" className={styles.countryImage} /> <span className={styles.country}>{user.country}</span></p>
                    </div>
                    <div className={styles.linkContainer}>
                        <p><img src={linkIcon} alt="Link" className={styles.linkImage} /> <a href={user.link} target="_blank" rel="noopener noreferrer" className={styles.link}>{user.link}</a></p>
                    </div>
                    <button onClick={() => setIsEditing(true)} className={styles.editButton}>Edit</button>
                </div>
            )}
        </div>
    );
}

export default ArtistDetailsEditable;