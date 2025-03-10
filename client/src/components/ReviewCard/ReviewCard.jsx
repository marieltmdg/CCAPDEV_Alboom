import styles from './ReviewCard.module.css'
import BoomMeter from '../BoomMeter/BoomMeter'
import defaultUserPhoto from '../../assets/users/UserPhoto2.jpg'
import upvote from '../../assets/helpful.svg'
import downvote from '../../assets/unhelpful.svg'

let reply = "Bro, it's just music. Chill. But also… keep going. Damn, you sure you ain't off some psychedelics? Hope your neurons are doin’ alright tho. But nah, I appreciate it. That’s the kinda review that makes me wanna go back in the studio and get even weirder. Respect."

import { Link } from 'react-router-dom'

function ReviewCard({Album, Review, IsEdited, IsReviewEditable, Delete}) {
    return(
        <>
        <div className={styles.mainContainer}>
         
            <div className={styles.left}>
                <div className={styles.leftTop}>
                    <Link to={`/user/` + Review.user_id.username}><img className={styles.userPhoto} src={"http://localhost:3000/" + Review.user_id.picture}></img></Link>
                </div>
                <div className={styles.leftBottom}>
                    <div className={styles.voteBox}>
                        <img className={styles.votes} src={upvote}></img>
                    </div>
                    <p className={styles.voteCount}>{Review.upvotes}</p>
                    <div className={styles.voteBox}>
                        <img className={styles.votes} src={downvote}></img>
                    </div>
                    <p className={styles.voteCount}>{Review.downvotes}</p>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.rightTop}>
                    <BoomMeter className={styles.boomMeter} Rating={Review.rating}/>
                </div>
                <div className={styles.rightMiddle}>
                    <h3 className={styles.userReviewHeading}>{Review.title}</h3>
                    {IsEdited && <p className={styles.isEdited}>Edited</p>}
                    <p className={styles.userReviewText}>
                        {Review.review_text.length > 400 
                        ? Review.review_text.substring(0, 400) + "..." 
                        : Review.review_text}
                    </p>
                </div>
                <div className={styles.rightBottom}>
                    {IsReviewEditable && (
                        <>
                        <div className={styles.actionsContainer}>
                        <h6 onClick={() => Delete(Review.user_id._id, Album._id)}>DELETE</h6>
                        </div>
                        <div className={styles.actionsContainer}>
                        <h6>EDIT</h6>
                        </div>
                        </>
                    )}
                </div>
            </div>
            
            {Review.reply_text && (
            <div className={styles.artistReplyContainer}>
                <div className={styles.left}>
                    <div className={styles.leftTop}>
                        <Link to={"/artist/" + Album.artist_id.artistname}><img className={styles.userPhoto} src={"http://localhost:3000/" + Album.artist_id.picture} /></Link>
                    </div>
                    <div className={styles.leftBottom}></div>
                </div>

                <div className={styles.right}>
                    <div className={styles.rightTop}>
                        <h5>ARTIST</h5>
                    </div>
                    <div className={styles.rightMiddle}>
                        <h3 className={styles.userReviewHeading}>Reply by {Album.artist_id.artistname}</h3>
                        {/* {IsEdited && <p className={styles.isEdited}>Edited</p>} */}
                        <p className={styles.userReviewText}>
                        {reply.length > 400 
                            ? reply.substring(0, 400) + "..." 
                            : reply}
                        </p>
                    </div>
                    <div className={styles.rightBottom}>
                        {/* {IsReviewEditable && (
                            <>
                            <div className={styles.actionsContainer}>
                            <h6>DELETE</h6>
                            </div>
                            <div className={styles.actionsContainer}>
                            <h6>EDIT</h6>
                            </div>
                            </>
                        )} */}
                    </div>
                </div>
            </div>
            )}
        </div>
        </>
    )
}

export default ReviewCard