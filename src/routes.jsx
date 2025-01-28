import App from './pages/App.jsx'
import Album from './pages/Album.jsx'
import User from './pages/User.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

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