import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function Sports() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/sports");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Sports Updates</h2>
        {user && <Link to="/sports/new" className="bg-blue-600 text-white px-3 py-1 rounded">Create Post</Link>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map(post => (
          <div key={post._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{post.sportName}</h3>
            <p>{post.description}</p>
            <p>Update Type: {post.updateType}</p>
            <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
