import React, { useState, ChangeEvent, FormEvent } from "react"
import { useNavigate } from "react-router-dom"

interface FormData {
    email: string
    password: string
    name: string
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        name: "",
    })
    const [message, setMessage] = useState<string>("")
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setMessage("") // Clear previous messages

        try {
            const response = await fetch(
                "http://localhost:3000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                },
            )
            const data = await response.json()
            if (response.ok) {
                alert("User registered successfully!")

                setTimeout(() => {
                    navigate("/login")
                }, 500)

                setMessage("User registered successfully!")
                setFormData({ email: "", password: "", name: "" }) // Reset form
            } else {
                setMessage(data.message || "Registration failed")
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.")
            console.error("Error:", error)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Register</h1>
            <form
                onSubmit={handleSubmit}
                style={{ display: "inline-block", textAlign: "left" }}
            >
                <div>
                    <label>Name:</label>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type='submit'
                    style={{ padding: "10px 20px", marginTop: "10px" }}
                >
                    Register
                </button>
            </form>
            {message && (
                <p
                    style={{
                        marginTop: "20px",
                        color: message.includes("successfully")
                            ? "green"
                            : "red",
                    }}
                >
                    {message}
                </p>
            )}
        </div>
    )
}

export default Register
