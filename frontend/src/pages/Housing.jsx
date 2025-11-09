import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function Housing() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/housing");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Housing / Mess / Flat / Seat</h2>
        {user && <Link to="/housing/new" className="bg-blue-600 text-white px-3 py-1 rounded">Create Post</Link>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map(post => (
          <div key={post._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{post.type} - {post.location}</h3>
            <p>{post.description}</p>
            <p className="font-semibold">Rent: {post.rent} BDT</p>
            <p>Contact: {post.contact}</p>
            <p>Posted by: {post.postedBy.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
