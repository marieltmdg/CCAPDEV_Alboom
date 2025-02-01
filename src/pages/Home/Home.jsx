import Header from "../../components/Header/Header.jsx"
import Main from "../../components/Main"
import AlbumGrid from "../../components/AlbumGrid/AlbumGrid.jsx"

import alboom from '../../assets/alboom.png'

import styles from './Home.module.css'

function Home() {
    return (
        <>
            <Header isAuth={false} />
            <Main>
                <img src={alboom} alt="album" className={styles.alboom}/>

                <div className={styles.row}>
                    <h1 className={styles.title}>Most Explosive Albums</h1>
                </div>

                <hr></hr>
                
                <AlbumGrid />
            </Main>
        </>
    )    
}

export default Home