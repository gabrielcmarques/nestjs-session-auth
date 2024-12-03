import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

const Login: React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

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
                const data = await response.json()
                localStorage.setItem("token", data.token)

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
        <div className='login-container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin} className='login-form'>
                <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <div className='password-wrapper'>
                        <input
                            type={showPassword ? "text" : "password"}
                            id='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type='button'
                            className='show-password-btn'
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <button type='submit' className='login-button'>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
