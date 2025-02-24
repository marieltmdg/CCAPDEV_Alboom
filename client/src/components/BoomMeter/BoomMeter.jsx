import styles from './BoomMeter.module.css';
import boom from '../../assets/logo.png';

function BoomMeter(props) {

    return (
        <div className={styles.mainContainer}>
            <div className={styles.boomContainer}>
                {[...Array(props.Rating)].map((_, index) => (
                    <img key={index} className={styles.boomLogo} src={boom}/>
                ))}
            </div>
        </div>
    );
}

BoomMeter.defaultProps = {
    Rating: 1,
}

export default BoomMeter;
