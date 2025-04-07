import React, { useEffect, useState } from "react";
import styles from "./Details.module.css";
import linkIcon from "../../assets/link.png";
import pin from "../../assets/pin.png";
import avatar from "../../assets/avatar.png";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading.jsx";
import { useAuth } from "../../authContext.jsx";
import upload from "../../assets/upload.svg";

function UserDetailsEditable({ userData }) {
    const { username } = useParams();
    // Initialize local user state with the provided userData
    const [user, setUser] = useState(userData);
    const [isEditing, setIsEditing] = useState(false);
    const [photo, setPhoto] = useState(null);
    const { authState } = useAuth();
    const [formData, setFormData] = useState({
        bio: userData?.bio || "",
        country: userData?.country || "",
        link: userData?.link || "",
        picturePreview: userData?.picture ? "" : "" // Optional: you may set an initial picture preview if desired
    });

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const staticBaseUrl = apiBaseUrl.replace('/api', ''); // Remove '/api' for static files

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
    
            const response = await fetch(`${apiBaseUrl}/user/${username}`, {
                method: "PUT",
                body: formDataToSend, 
            });
    
            if (!response.ok) {
                throw new Error("Failed to update user");
            }
    
            const updatedUser = await response.json();
            setUser(updatedUser);
            // Update formData with the new data (optional)
            setFormData({
                bio: updatedUser.bio,
                country: updatedUser.country,
                link: updatedUser.link,
                picturePreview: updatedUser.picture ? `${staticBaseUrl}/${updatedUser.picture}` : ""
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    if (!user) return <Loading />;

    return (
        <div className={styles.userProfileContainer}>
            {isEditing ? (
                <div className={styles.editForm}>
                    <div className={styles.profilePictureContainer}>
                        <label htmlFor="avatar" className={styles.avatar}>
                            <img 
                                id="preview"
                                src={formData.picturePreview || (user.picture ? `${staticBaseUrl}/${user.picture}` : avatar)} 
                                className={styles.profilePictureImage} 
                                alt="Avatar" 
                            />
                            <input type="file" id="avatar" accept="image/*" className={styles.upload} onChange={handleFileChange} />
                            <img src={upload} alt="Upload" className={styles.uploadIcon} />
                        </label>
                    </div>

                    <div className={styles.profileNameContainerEditing}>
                        <span className={styles.profileName}>{user.username}</span>
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
                        <img 
                            src={user.picture ? `${staticBaseUrl}/${user.picture}` : avatar} 
                            className={styles.profilePictureImage} 
                            alt="Profile Picture" 
                        />
                    </div>
        
                    <div className={styles.profileNameContainer}>
                        <span className={styles.profileName}>{user.username}</span>
                    </div>
        
                    <div className={styles.profileBioContainer}>
                        <span className={styles.profileBio}>{user.bio}</span>
                    </div>
        
                    <div className={styles.countryContainer}>
                        <img src={pin} className={styles.countryImage} alt="Location" />
                        <span className={styles.country}>{user.country}</span>
                    </div>
        
                    <div className={styles.linkContainer}>
                        <img src={linkIcon} className={styles.linkImage} alt="Link" />
                        <a href={user.link} className={styles.link} target="_blank" rel="noopener noreferrer">
                            {user.link}
                        </a>
                    </div>

                    {authState.authenticated && authState.user?._id === user?._id && (
                        <button 
                            onClick={() => setIsEditing(true)} 
                            className={styles.editButton}
                        >
                            Edit
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserDetailsEditable;
