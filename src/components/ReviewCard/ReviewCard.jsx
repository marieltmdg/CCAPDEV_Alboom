import styles from './ReviewCard.module.css'
import BoomMeter from '../BoomMeter/BoomMeter'
import defaultUserPhoto from '../../assets/users/UserPhoto2.jpg'
import upvote from '../../assets/helpful.svg'
import downvote from '../../assets/unhelpful.svg'

import tyler from '../../assets/artists/tyler.jpg'

let reply = "Bro, it's just music. Chill. But also… keep going. Damn, you sure you ain't off some psychedelics? Hope your neurons are doin’ alright tho. But nah, I appreciate it. That’s the kinda review that makes me wanna go back in the studio and get even weirder. Respect."

import { Link } from 'react-router-dom'

function ReviewCard(props) {
    return(
        <>
        <div className={styles.mainContainer}>
         
            <div className={styles.left}>
                <div className={styles.leftTop}>
                    <Link to={`/user/johndoe`}><img className={styles.userPhoto} src={props.UserPhoto}></img></Link>
                </div>
                <div className={styles.leftBottom}>
                    <div className={styles.voteBox}>
                        <img className={styles.votes} src={upvote}></img>
                    </div>
                    <p className={styles.voteCount}>70</p>
                    <div className={styles.voteBox}>
                        <img className={styles.votes} src={downvote}></img>
                    </div>
                    <p className={styles.voteCount}>70</p>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.rightTop}>
                    <BoomMeter className={styles.boomMeter} Rating={props.Rating}/>
                </div>
                <div className={styles.rightMiddle}>
                    <h3 className={styles.userReviewHeading}>Review by {props.Username}</h3>
                    {props.IsEdited && <p className={styles.isEdited}>Edited</p>}
                    <p className={styles.userReviewText}>
                        {props.UserReviewText.length > 400 
                        ? props.UserReviewText.substring(0, 400) + "..." 
                        : props.UserReviewText}
                    </p>
                </div>
                <div className={styles.rightBottom}>
                    {props.IsReviewEditable && (
                        <>
                        <div className={styles.actionsContainer}>
                        <h6>DELETE</h6>
                        </div>
                        <div className={styles.actionsContainer}>
                        <h6>EDIT</h6>
                        </div>
                        </>
                    )}
                </div>
            </div>
            
            {props.HasReply && (
            <div className={styles.artistReplyContainer}>
                <div className={styles.left}>
                    <div className={styles.leftTop}>
                        <Link to={`/artist/tyler,-the-creator`}><img className={styles.userPhoto} src={tyler} /></Link>
                    </div>
                    <div className={styles.leftBottom}></div>
                </div>

                <div className={styles.right}>
                    <div className={styles.rightTop}>
                        <h5>ARTIST</h5>
                    </div>
                    <div className={styles.rightMiddle}>
                        <h3 className={styles.userReviewHeading}>Reply by Tyler, The Creator</h3>
                        {props.IsEdited && <p className={styles.isEdited}>Edited</p>}
                        <p className={styles.userReviewText}>
                        {reply.length > 400 
                            ? reply.substring(0, 400) + "..." 
                            : reply}
                        </p>
                    </div>
                    <div className={styles.rightBottom}>
                        {props.IsReplyEditable && (
                            <>
                            <div className={styles.actionsContainer}>
                            <h6>DELETE</h6>
                            </div>
                            <div className={styles.actionsContainer}>
                            <h6>EDIT</h6>
                            </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            )}
        </div>
        </>
    )
}

ReviewCard.defaultProps = {
    UserPhoto: defaultUserPhoto,
    IsEdited: false,
    HasReply: false,
    IsReviewEditable: false,
    IsReplyEditable: false,
}

export default ReviewCard