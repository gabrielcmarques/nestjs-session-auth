import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Post } from "../../types/Post"
import "./Posts.css"

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:3000/posts")
                if (!response.ok) {
                    throw new Error(
                        `Error: ${response.status} ${response.statusText}`,
                    )
                }
                const data = await response.json()
                setPosts(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    // const handleCreatePost = () => {
    //     navigate("/create-post")
    // }

    if (loading) return <p>Loading posts...</p>
    if (error) return <p>Error loading posts: </p>
    return (
        <div className='posts-page'>
            <h1>All Posts</h1>
            {posts.length > 0 ? (
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.content || "No content available"}</p>

                            <div className='post-meta'>
                                <small>
                                    By User ID: {post.authorId || "Unknown"}
                                </small>
                                <small>
                                    Created At:{" "}
                                    {new Date(
                                        post.createdAt,
                                    ).toLocaleDateString()}
                                </small>
                                <small>
                                    Updated At:{" "}
                                    {new Date(
                                        post.updatedAt,
                                    ).toLocaleDateString()}
                                </small>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts available</p>
            )}
        </div>
    )
}

export default Posts
