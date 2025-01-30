import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './main.css'

import Home from './pages/Home.jsx'
import Album from './pages/Album.jsx'
import User from './pages/User.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import UserProfile from './pages/UserProfile.jsx'
import CreateReview from './pages/CreateReview.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/album/:title",
        element: <Album />
    },
    {
        path: "/album/:title/create",
        element: <CreateReview />
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
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)