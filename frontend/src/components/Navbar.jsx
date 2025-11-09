import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">CampusHub SUST</Link>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/buysell">Buy/Sell</Link>
        <Link to="/housing">Housing</Link>
        <Link to="/events">Events</Link>
        <Link to="/sports">Sports</Link>

        {user ? (
          <>
            {user.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
            <span>{user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 px-2 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-white text-blue-600 px-2 py-1 rounded">
              Login
            </Link>
            <Link to="/register" className="bg-white text-blue-600 px-2 py-1 rounded">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
