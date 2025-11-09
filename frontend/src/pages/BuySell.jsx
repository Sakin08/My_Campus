import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PostCard from "../components/PostCard.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function BuySell() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/buysell");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Buy & Sell</h2>
        {user && <Link to="/buysell/new" className="bg-blue-600 text-white px-3 py-1 rounded">Create Post</Link>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map(post => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
}
