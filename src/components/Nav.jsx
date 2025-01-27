import alboom from '../assets/alboom.png'
import search from '../assets/search.svg'

import './Nav.css'

function Nav() {
    return (
        <nav>
            <img src={alboom} alt="Alboom" />
            <input type="text" />
            <img src={search} alt="Search" />
            <button>Register</button>
            <button>Sign In</button>
        </nav>
    )
}

export default Nav