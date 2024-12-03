import React from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar: React.FC = () => {
    const token = localStorage.getItem("token")

    const handleLogout = () => {
        localStorage.removeItem("token") // Remove the token from local storage
        window.location.href = "/" // Redirect to the home page or login page
    }

    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <Link to='/'>
                    <span>Auth App</span>
                </Link>
            </div>
            <div className='navbar-links'>
                <Link to='/'>Home</Link>
                <Link to='/posts'>Posts</Link>
                <Link to='/profile'>Profile</Link>
                <Link to='/about'>About</Link>
            </div>

            <div className='navbar-actions'>
                {token ? (
                    <>
                        <Link
                            to='/register'
                            className='navbar-button navbar-signup'
                        >
                            Sign Up
                        </Link>
                        <Link
                            to='/login'
                            className='navbar-button navbar-login'
                        >
                            Login
                        </Link>
                    </>
                ) : (
                    <>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
