import Header from "../components/Header"
import Main from "../components/Main"
import AlbumGrid from "../components/AlbumGrid"

import alboom from '../assets/alboom.png'

import './Home.css'

function Home() {
    return (
        <>
            <Header isAuth={false} />
            <Main>
                <img src={alboom} alt="album" className='alboom'/>

                <div className="most-explosive">
                    <h1>Most Explosive Albums</h1>
                </div>
                
                <AlbumGrid />
            </Main>
        </>
    )    
}

export default Home