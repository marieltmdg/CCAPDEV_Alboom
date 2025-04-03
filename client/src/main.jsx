import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './authContext.jsx'

import axios from "axios"
axios.defaults.withCredentials = true;

import './main.css'

import Home from './pages/Home/Home.jsx'
import Album from './pages/Album/Album.jsx'
import User from './pages/User/User.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import CreateReview from './pages/CreateReview/CreateReview.jsx'
import UpdateReview from './pages/UpdateReview/UpdateReview.jsx'
import Artist from './pages/Artist/Artist.jsx'
import About from './pages/About/About.jsx'

import ProtectedRoute from './ProtectedRoute.jsx'
import PublicRoute from './PublicRoute.jsx'

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
        element: <ProtectedRoute element={<CreateReview />} />
    },
    {
        path: "/album/:id/update",
        element: <ProtectedRoute element={<UpdateReview />} />
    },
    {
        path: "/user/:username",
        element: <User />
    },
    {
        path: "/login",
        element: <PublicRoute element={<Login />} />
    },
    {
        path: "/artist/:username",
        element: <Artist />
    },
    {
        path: "/register",
        element: <PublicRoute element={<Register />} />
    },
    {
        path: "/about",
        element: <About />
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>
)