import App from './App.jsx'
import Album from './Album.jsx'
import User from './User.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'

const routes = [
    {
        path: "/",
        element: <App />
    },
    {
        path: "/album/:title",
        element: <Album />
    },
    {
        path: "/user/:username",
        element: <User />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]

export default routes;