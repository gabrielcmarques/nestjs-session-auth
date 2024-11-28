import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<h1>Homepage</h1>} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </Router>
    )
}

export default App
