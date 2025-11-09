import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p>Welcome, <span className="font-semibold">{user.name}</span>!</p>
      <p>Role: {user.role}</p>
      <p>Email: {user.email}</p>
      <p>Registration No: {user.regNo}</p>
      <p>Department: {user.department || "N/A"}</p>
      <p>Batch: {user.batch || "N/A"}</p>
      <p>Verified: {user.verified ? "Yes" : "No"}</p>
    </div>
  );
};

export default Dashboard;
