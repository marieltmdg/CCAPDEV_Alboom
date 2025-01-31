import { useParams } from "react-router-dom"

import Header from "../components/Header/Header.jsx"
import Main from "../components/Main"

import UserProfile from '../components/UserDetails/UserProfile.jsx';

function User() {
    return (
        <>
            <Header isAuth={true} />
            <Main>
                <UserProfile />
            </Main>
        </>
    );
}

export default User;