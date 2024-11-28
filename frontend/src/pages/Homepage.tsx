import { useNavigate } from "react-router-dom"

const Homepage: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Homepage</h1>
            <button
                onClick={() => navigate("/register")}
                style={{ padding: "10px 20px", fontSize: "16px" }}
            >
                Sign Upp
            </button>
        </div>
    )
}

export default Homepage
//1
