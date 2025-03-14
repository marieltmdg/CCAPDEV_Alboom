import { useState } from 'react';
import styles from './ReviewCard.module.css';
import BoomMeter from '../BoomMeter/BoomMeter';
import defaultUserPhoto from '../../assets/users/UserPhoto2.jpg';
import upvote from '../../assets/helpful.svg';
import downvote from '../../assets/unhelpful.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

let reply = "Bro, it's just music. Chill. But also… keep going. Damn, you sure you ain't off some psychedelics? Hope your neurons are doin’ alright tho. But nah, I appreciate it. That’s the kinda review that makes me wanna go back in the studio and get even weirder. Respect.";

function ReviewCard({ Album, Review, IsEdited, IsReviewEditable, Delete, Upvote, Downvote }) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');

    // Toggle reply form visibility
    const handleReplyClick = () => {
        setShowReplyForm(!showReplyForm);
    };

    // Handle reply submission
    const handleReplySubmit = (event) => {
        event.preventDefault();
        setTimeout(async () => {
            console.log("Reply submitted:", replyText);
            await axios.put("http://localhost:3000/api/reviews/updateReply/" + Review._id, {replyText: replyText}, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setReplyText('');
            setShowReplyForm(false);
        }, 0);
    }
        

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.left}>
                    <div className={styles.leftTop}>
                        <Link to={`/user/` + Review.user_id.username}>
                            <img className={styles.userPhoto} src={"http://localhost:3000/" + Review.user_id.picture} alt="User" />
                        </Link>
                    </div>
                    <div className={styles.leftBottom}>
                        <div onClick={() => Upvote(Review._id)} className={styles.voteBox}>
                            <img className={styles.votes} src={upvote} alt="Upvote" />
                        </div>
                        <p className={styles.voteCount}>{Review.upvotes}</p>
                        <div onClick={() => Downvote(Review._id)} className={styles.voteBox}>
                            <img className={styles.votes} src={downvote} alt="Downvote" />
                        </div>
                        <p className={styles.voteCount}>{Review.downvotes}</p>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.rightTop}>
                        <BoomMeter className={styles.boomMeter} Rating={Review.rating} />
                    </div>
                    <div className={styles.rightMiddle}>
                        <h3 className={styles.userReviewHeading}>{Review.title}</h3>
                        {IsEdited && <p className={styles.isEdited}>Edited</p>}
                        <p className={styles.userReviewText}>
                            {Review.review_text}
                        </p>
                        {Review.picture && (
                            <img src={"http://localhost:3000/" + Review.picture} className={styles.reviewImage} alt="Review" />
                        )}
                    </div>
                    <div className={styles.rightBottom}>
                        {IsReviewEditable && (
                            <>
                                <div className={styles.actionsContainer} onClick={() => Delete(Review._id)}>
                                    <h6>DELETE</h6>
                                </div>
                                <Link to={`/album/` + Review._id + "/update"}><div className={styles.actionsContainer}>
                                    <h6 className={styles.buttonText}>EDIT</h6>
                                </div></Link>
                            </>
                        )}
                        {/* Reply Button */}
                        <div className={styles.actionsContainer} onClick={handleReplyClick}>
                            <h6>REPLY</h6>
                        </div>
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
                                Submit Reply
                            </button>
                        </form>
                    </div>
                )}

                {Review.reply_text && (
                    <div className={styles.artistReplyContainer}>
                        <div className={styles.left}>
                            <div className={styles.leftTop}>
                                <Link to={"/artist/" + Album.artist_id.artistname}>
                                    <img className={styles.userPhoto} src={"http://localhost:3000/" + Album.artist_id.picture} alt="Artist" />
                                </Link>
                            </div>
                            <div className={styles.leftBottom}></div>
                        </div>

                        <div className={styles.right}>
                            <div className={styles.rightTop}>
                                <h5>ARTIST</h5>
                            </div>
                            <div className={styles.rightMiddle}>
                                <h3 className={styles.userReviewHeading}>Reply by {Album.artist_id.artistname}</h3>
                                <p className={styles.userReviewText}>
                                    {reply}
                                </p>
                            </div>
                            <div className={styles.rightBottom}>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ReviewCard;