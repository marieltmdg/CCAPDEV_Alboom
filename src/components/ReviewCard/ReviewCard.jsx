import styles from './ReviewCard.module.css'
import userPhoto from '../../assets/users/UserPhoto2.jpg'
import upvote from '../../assets/helpful.svg'
import downvote from '../../assets/unhelpful.svg'

function ReviewCard() {
    return(
        <div className={styles.mainContainer}>

            <div className={styles.left}>
                <div className={styles.leftTop}>
                    <img className={styles.userPhoto} src={userPhoto}></img>
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

                </div>
                <div className={styles.rightBottom}>

                </div>
            </div>

        </div>
    )
}

ReviewCard.defaultProps = {
}

export default ReviewCard