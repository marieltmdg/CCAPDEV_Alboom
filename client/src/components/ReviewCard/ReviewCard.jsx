import { useState, useEffect } from 'react';
import styles from './ReviewCard.module.css';
import BoomMeter from '../BoomMeter/BoomMeter';
import defaultUserPhoto from '../../assets/avatar.png';
import upvote from '../../assets/helpful.svg';
import downvote from '../../assets/unhelpful.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../authContext';

function ReviewCard({ Album, Review, IsEdited, IsReviewEditable, Delete, Refresh, userID }) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [hasVoted, setHasVoted] = useState(false);
    const [voteType, setVoteType] = useState(null);
    const { authState } = useAuth();

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    // Ensure the staticBaseUrl removes '/api' for static files
    const staticBaseUrl = apiBaseUrl.replace('/api', '');

    useEffect(() => {
        const checkUserVote = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/reviews/voteStatus/${Review._id}/${userID}`);
                setHasVoted(response.data.hasVoted);
                setVoteType(response.data.voteType);
            } catch (error) {
                console.error("Error checking vote status:", error);
            }
        };

        if (authState.authenticated) {
            checkUserVote();
        }
    }, [Review._id, userID, apiBaseUrl]);

    const handleReplyClick = () => {
        setShowReplyForm(!showReplyForm);
    };

    const handleReplySubmit = (event) => {
        event.preventDefault();
        setTimeout(async () => {
            await axios.put(`${apiBaseUrl}/reviews/updateReply/${Review._id}`, { replyText: replyText }, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setReplyText('');
            setShowReplyForm(false);
            Refresh();
        }, 0);
    };

    const handleUpvote = async () => {
        try {
            await axios.patch(`${apiBaseUrl}/reviews/upvote/${Review._id}`, { userID });
            Refresh();
            setHasVoted(true);
            setVoteType("upvote");
        } catch (error) {
            console.error("Error upvoting review:", error);
            alert("You have already upvoted this review.");
        }
    };

    const handleDownvote = async () => {
        try {
            await axios.patch(`${apiBaseUrl}/reviews/downvote/${Review._id}`, { userID });
            Refresh();
            setHasVoted(true);
            setVoteType("downvote");
        } catch (error) {
            console.error("Error downvoting review:", error);
            alert("You have already downvoted this review.");
        }
    };

    return (
        <>
            <div className={styles.mainContainer}>

                {/* TOP */}
                <div className={styles.top}>
                    <div className={styles.topLeft}>
                        <div className={styles.topLeft1}>
                            <Link to={`/user/` + Review.user_id.username}>
                                <img
                                    className={styles.userPhoto}
                                    src={Review.user_id.picture ? `${staticBaseUrl}/${Review.user_id.picture}` : defaultUserPhoto}
                                    alt="User"
                                />
                            </Link>
                        </div>

                        <div className={styles.topLeft2}>
                            <h3 className={styles.userReviewHeading}>{Review.title}</h3>
                            {IsEdited && <p className={styles.isEdited}>Edited</p>}
                        </div>
                    </div>

                    <div className={styles.topRight}>
                        <BoomMeter className={styles.boomMeter} Rating={Review.rating} />
                    </div>
                </div>

                {/* MIDDLE */}
                <div className={styles.middle}>
                    <div className={styles.middleMain}>
                        {Review.picture && (
                            <img
                                src={`${staticBaseUrl}/${Review.picture}`}
                                className={styles.reviewImage}
                                alt="Review"
                            />
                        )}
                        <p className={styles.userReviewText}>
                            {Review.review_text}
                        </p>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className={styles.bottom}>
                    <div className={styles.bottomLeft}>
                        <div className={styles.bottomLeftMain}>
                            <div
                                onClick={authState.authenticated && authState.type === "user" && voteType !== "upvote" ? handleUpvote : null}
                                className={`${styles.voteBox} ${voteType === "upvote" || !authState.authenticated ||  authState.type === "artist" ? styles.disabled : ''}`}
                            >
                                <img className={styles.votes} src={upvote} alt="Upvote" />
                            </div>
                            <p className={styles.voteCount}>{Review.upvotes}</p>
                            <div
                                onClick={authState.authenticated && authState.type === "user" && voteType !== "downvote" ? handleDownvote : null}
                                className={`${styles.voteBox} ${voteType === "downvote" || !authState.authenticated || authState.type === "artist"? styles.disabled : ''}`}
                            >
                                <img className={styles.votes} src={downvote} alt="Downvote" />
                            </div>
                            <p className={styles.voteCount}>{Review.downvotes}</p>
                        </div>
                        <div className={styles.filler80}></div>
                    </div>

                    <div className={styles.bottomRight}>
                        {authState.authenticated && authState.user?._id === Review?.user_id._id && (
                            <>
                                <div className={styles.actionsContainer} onClick={() => Delete(Review._id)}>
                                    <h6>DELETE</h6>
                                </div>
                                <Link to={`/album/` + Review._id + "/update"}>
                                    <div className={styles.actionsContainer}>
                                        <h6 className={styles.buttonText}>EDIT</h6>
                                    </div>
                                </Link>
                            </>
                        )}
                        {/* Reply Button */}
                        {authState.authenticated && authState.user?._id === Album?.artist_id._id && (
                            <div className={styles.actionsContainer} onClick={handleReplyClick}>
                                <h6>REPLY</h6>
                            </div>
                        )}
                    </div>
                </div>

                {/* Reply Form */}
                {showReplyForm && (
                    <div className={styles.replyFormContainer}>
                        <form onSubmit={handleReplySubmit}>
                            <textarea
                                className={styles.replyTextArea}
                                placeholder="Write your reply..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                required
                            />
                            <button type="submit" className={styles.submitButton}>
                                <h6>SUBMIT</h6>
                            </button>
                        </form>
                    </div>
                )}

                {Review.reply_text && (
                    <div className={styles.artistReplyContainer}>
                        <div className={styles.top}>
                            <div className={styles.topLeft}>
                                <div className={styles.topLeft1}>
                                    <Link to={"/artist/" + Album.artist_id.username}>
                                        <img
                                            className={styles.userPhoto}
                                            src={`${staticBaseUrl}/${Album.artist_id.picture}`}
                                            alt="Artist"
                                        />
                                    </Link>
                                </div>
                                <div className={styles.topLeft2}>
                                    <h3 className={styles.userReviewHeading}>Reply by {Album.artist_id.username}</h3>
                                </div>
                            </div>

                            <div className={styles.topRight}>
                                <h5>ARTIST</h5>
                            </div>
                        </div>

                        <div className={styles.middle}>
                            <div className={styles.middleMain}>
                                <p className={styles.userReviewText}>
                                    {Review.reply_text}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ReviewCard;