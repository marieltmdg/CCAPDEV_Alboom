import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./ArtistAlbums.module.css";
import { useAuth } from "../../authContext.jsx";

function ArtistAlbumsEditable({ Albums }) {
    const [albumRatings, setAlbumRatings] = useState({});
    const [editingAlbumId, setEditingAlbumId] = useState(null);
    const [description, setDescription] = useState("");
    const { authState } = useAuth(); // Get setAuthState from context

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const staticBaseUrl = apiBaseUrl.replace('/api', ''); 

    useEffect(() => {
        const fetchRatings = async () => {
            const ratings = {};
            for (const album of Albums) {
                try {
                    const response = await axios.get(`${apiBaseUrl}/reviews/album/${album._id}`);
                    const reviews = response.data;
                    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
                    ratings[album._id] = isNaN(averageRating) ? "-1" : averageRating.toFixed(2);
                } catch (error) {
                    console.error("Error fetching reviews:", error);
                }
            }
            setAlbumRatings(ratings);
        };

        if (Albums.length > 0) {
            fetchRatings();
        }
    }, [Albums, apiBaseUrl]);

    const handleEditClick = (album, event) => {
        event.stopPropagation();
        setEditingAlbumId(album._id);
        setDescription(album.description);
    };

    const handleSaveClick = async (albumId, event) => {
        event.stopPropagation();
        try {
            const response = await axios.put(`${apiBaseUrl}/albums/${albumId}`, {
                description,
            });

            if (response.status !== 200) {
                throw new Error("Failed to update album");
            }

            setEditingAlbumId(null);
        } catch (error) {
            console.error("Error updating album:", error);
        }
    };

    return (
        <div className={styles.artistReviewContainer}>
            {Albums && Albums.map((album) => (
                <div key={album._id} className={styles.item}>
                    <div className={styles.reviewItem}>
                        <Link to={`/album/${album._id}`} className={styles.albumLink}>
                            <div className={styles.albumCover}>
                                <img
                                    src={`${staticBaseUrl}/${album.cover}`}
                                    alt={`${album.title} Cover`}
                                    className={styles.albumCover}
                                />
                            </div>
                        </Link>
                        <div className={styles.ratingContainer}>
                            <span className={styles.boomText}>
                                {albumRatings[album._id] === "-1" ? "No reviews" : `${albumRatings[album._id]} BOOMS`}
                            </span>
                        </div>

                        {editingAlbumId === album._id ? (
                            <div className={styles.editForm}>
                                <textarea
                                    className={styles.descriptionEdit}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                
                                <div className={styles.buttonContainerEdit}>
                                    <button
                                        onClick={(event) => {
                                            setEditingAlbumId(null);
                                        }}
                                        className={styles.buttonCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={(event) => handleSaveClick(album._id, event)}
                                        className={styles.buttonEditing}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.buttonContainer}>
                               {authState.authenticated && authState.user?._id === album?.artist_id && (
                                    <button
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleEditClick(album, event);
                                        }}
                                        className={styles.button}
                                    >
                                        Edit Description
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ArtistAlbumsEditable;