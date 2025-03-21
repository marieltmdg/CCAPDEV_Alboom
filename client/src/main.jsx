import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './main.css'

import Home from './pages/Home/Home.jsx'
import Album from './pages/Album/Album.jsx'
import User from './pages/User/User.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import CreateReview from './pages/CreateReview/CreateReview.jsx'
import UpdateReview from './pages/UpdateReview/UpdateReview.jsx'
import Artist from './pages/Artist/Artist.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/album/:id",
        element: <Album />
    },
    {
        path: "/album/:id/create",
        element: <CreateReview />
    },
    {
        path: "/album/:id/update",
        element: <UpdateReview />
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
        path: "/artist/:artistname",
        element: <Artist />
    },
    {
        path: "/register",
        element: <Register />
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)