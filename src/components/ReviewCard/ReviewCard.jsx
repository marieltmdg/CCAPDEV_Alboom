import styles from './ReviewCard.module.css'
import BoomMeter from '../BoomMeter/BoomMeter'
import defaultUserPhoto from '../../assets/users/UserPhoto2.jpg'
import upvote from '../../assets/helpful.svg'
import downvote from '../../assets/unhelpful.svg'

function ReviewCard(props) {
    return(
        <div className={styles.mainContainer}>
         
            <div className={styles.left}>
                <div className={styles.leftTop}>
                    <img className={styles.userPhoto} src={props.UserPhoto}></img>
                </div>
                <div className={styles.leftBottom}>
                    <div className={styles.voteBox}>
                        <img className={styles.votes} src={upvote}></img>
                    </div>
                    <div className={styles.voteBox}>
                        <img className={styles.votes} src={downvote}></img>
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.rightTop}>
                    <BoomMeter className={styles.boomMeter} Rating={props.Rating}/>
                </div>
                <div className={styles.rightMiddle}>
                    <h3 className={styles.userReviewHeading}>Review by {props.Username}</h3>
                    <p className={styles.userReviewText}>{props.UserReviewText}</p>
                </div>
                <div className={styles.rightBottom}>
                    {props.IsPopular && (
                        <div className={styles.popularContainer}>
                            {<h4 className={styles.popularText}>BOOMING</h4>}
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

ReviewCard.defaultProps = {
    UserPhoto: defaultUserPhoto,
}

export default ReviewCard