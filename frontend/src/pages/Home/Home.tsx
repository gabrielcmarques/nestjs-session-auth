import { useNavigate } from "react-router-dom"
import Posts from "../../components/Posts/Posts"
import React, { useRef } from "react"
import "./Home.css"

const Home: React.FC = () => {
    const navigate = useNavigate()
    const dialogRef = useRef<HTMLDialogElement>(null)

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        closeDialog()
    }

    return (
        <div className='Home'>
            <h1>Home</h1>
            <button onClick={openDialog}>Create Post</button>

            <dialog ref={dialogRef}>
                <form
                    style={{ color: "white" }}
                    method='dialog'
                    onSubmit={handleFormSubmit}
                >
                    <h2>Create a New Post</h2>
                    <div>
                        <label>
                            Title:
                            <input type='text' name='title' required />
                        </label>
                    </div>
                    <div>
                        <label>
                            Content:
                            <textarea name='content' required></textarea>
                        </label>
                    </div>
                    <div>
                        <button type='submit'>Submit</button>
                        <button type='button' onClick={closeDialog}>
                            Cancel
                        </button>
                    </div>
                </form>
            </dialog>
            <Posts />
        </div>
    )
}

export default Home
//1
