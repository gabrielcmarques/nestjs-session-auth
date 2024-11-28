import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login: React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Send the login request to the backend here
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })

            if (response.ok) {
                alert("Login successful")
                // Redirect to another page after successful login if needed

                setTimeout(() => {
                    navigate("/")
                }, 500)
            } else {
                const data = await response.json()
                alert(`Login failed: ${data.message}`)
            }
        } catch (error) {
            console.error("An error occurred while logging in:", error)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login
