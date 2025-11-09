import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setStudents(res.data);
  };

  useEffect(() => {
    if (user?.role === "admin") fetchStudents();
  }, [user]);

  const handleStatusChange = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/admin/users/${id}/status`,
      { verified: status },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    fetchStudents();
  };

  if (user?.role !== "admin") return <p className="text-red-500">Access Denied</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>RegNo</th>
            <th>Department</th>
            <th>Batch</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id} className="border-b">
              <td className="p-2">{s.name}</td>
              <td>{s.email}</td>
              <td>{s.regNo}</td>
              <td>{s.department}</td>
              <td>{s.batch}</td>
              <td>{s.verified ? "Approved" : "Banned"}</td>
              <td className="space-x-2">
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded"
                  onClick={() => handleStatusChange(s._id, true)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleStatusChange(s._id, false)}
                >
                  Ban
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
