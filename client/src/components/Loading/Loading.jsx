import styles from './Loading.module.css'

function Loading() {
    return (
        <>
            <div className={styles.loader}>
                <div className={styles.container}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
            </div>
        </>
    );
}

export default Loading
