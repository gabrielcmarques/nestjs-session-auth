import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import Navbar from "./components/Navbar/Navbar"
import { AuthProvider } from "./contexts/AuthContext"

const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App
