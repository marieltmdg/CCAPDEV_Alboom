import './UserProfile.css';

import Header from "../components/Header/Header.jsx"
import Main from "../components/Main";

import link from '../assets/link.png';
import pin from '../assets/pin.png';    

function UserProfile() {
    return (
        <>
            <Header isAuth={true} />
            <Main>
                <div className="user-profile-container">

                    <div className="profile-picture-container">
                        <img src="avatar.png" className="profile-picture-image" alt="Profile"/>
                    </div>

                    <div className="profile-name-container">
                        <span className="profile-name">John Doe</span>
                    </div>

                    <div className="profile-bio-container">
                        <span className="profile-bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed euismod, turpis eget dictum tincidunt, nunc nisi fermentum velit</span>
                    </div>

                    <div className="country-container">
                        <img src={pin} className="country-image" alt="Link"/>
                        <span className="country">United States</span>
                    </div>

                    <div className="link-container">
                        <img src={link} className="link-image" alt="Link"/>
                        <a href="#" className="link">spotify</a>
                    </div>
                </div>
            </Main>
        </>
    );
}

export default UserProfile