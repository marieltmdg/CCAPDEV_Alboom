import './Headerin.css'

import alboom from '../assets/alboom.png'
import search from '../assets/search.png'
import avatar from '../assets/avatar.png'

function Headerin() {
    return <header>
        <div className="background-container">
            <div className="left-box">
                <img src={alboom} className="logo"></img>
            </div>
            <div className="center-box">
                <div className="search-wrapper">
                    <input className="search" type="search" placeholder="Search..."></input>
                    <button className="search-button" type="submit">
                        <img src={search} className='search-icon'></img>
                    </button>
                </div>
            </div>
            <div className="right-box">
                <img src={avatar} className='pfp'></img>
                <div className="blocker"></div>
            </div>
        </div>
    </header>
}

export default Headerin