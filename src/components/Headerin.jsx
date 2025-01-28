import './Headerin.css'

function Header() {
    return <header>
        <div className="background-container">
            <div className="left-box">
                <img src="src\assets\alboom.png" className="logo"></img>
            </div>
            <div className="center-box">
                <div className="search-wrapper">
                    <input className="search" type="search" placeholder="Search..."></input>
                    <button className="search-button" type="submit">
                        <img src="src\assets\search.png" className='search-icon'></img>
                    </button>
                </div>
            </div>
            <div className="right-box">
                <img src="src\assets\pfp.png" className='pfp'></img>
                <div className="blocker"></div>
            </div>
        </div>
    </header>
}

export default Header