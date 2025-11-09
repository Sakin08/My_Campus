import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [type, setType] = useState("buysell");
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `http://localhost:5000/api/${type}`;
      await axios.post(url, { ...form }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      navigate(`/${type}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create New Post</h2>
      <select className="border p-2 w-full mb-4" value={type} onChange={e => setType(e.target.value)}>
        <option value="buysell">Buy/Sell</option>
        <option value="housing">Housing</option>
        <option value="events">Event</option>
        <option value="sports">Sports</option>
      </select>

      {/* Render fields dynamically */}
      {type === "buysell" && (
        <>
          <input placeholder="Title" className="border p-2 w-full mb-2" onChange={e => setForm({...form, title:e.target.value})}/>
          <input placeholder="Description" className="border p-2 w-full mb-2" onChange={e => setForm({...form, description:e.target.value})}/>
          <input placeholder="Price" type="number" className="border p-2 w-full mb-2" onChange={e => setForm({...form, price:e.target.value})}/>
          <input placeholder="Category" className="border p-2 w-full mb-2" onChange={e => setForm({...form, category:e.target.value})}/>
        </>
      )}
      {type === "housing" && (
        <>
          <input placeholder="Type (Mess/Flat/Seat)" className="border p-2 w-full mb-2" onChange={e => setForm({...form, type:e.target.value})}/>
          <input placeholder="Location" className="border p-2 w-full mb-2" onChange={e => setForm({...form, location:e.target.value})}/>
          <input placeholder="Rent" type="number" className="border p-2 w-full mb-2" onChange={e => setForm({...form, rent:e.target.value})}/>
          <input placeholder="Contact" className="border p-2 w-full mb-2" onChange={e => setForm({...form, contact:e.target.value})}/>
          <textarea placeholder="Description" className="border p-2 w-full mb-2" onChange={e => setForm({...form, description:e.target.value})}/>
        </>
      )}
      {type === "events" && (
        <>
          <input placeholder="Event Name" className="border p-2 w-full mb-2" onChange={e => setForm({...form, eventName:e.target.value})}/>
          <input placeholder="Organizer" className="border p-2 w-full mb-2" onChange={e => setForm({...form, organizer:e.target.value})}/>
          <input placeholder="Date" type="date" className="border p-2 w-full mb-2" onChange={e => setForm({...form, date:e.target.value})}/>
          <input placeholder="Time" type="time" className="border p-2 w-full mb-2" onChange={e => setForm({...form, time:e.target.value})}/>
          <input placeholder="Venue" className="border p-2 w-full mb-2" onChange={e => setForm({...form, venue:e.target.value})}/>
          <textarea placeholder="Description" className="border p-2 w-full mb-2" onChange={e => setForm({...form, description:e.target.value})}/>
        </>
      )}
      {type === "sports" && (
        <>
          <input placeholder="Sport Name" className="border p-2 w-full mb-2" onChange={e => setForm({...form, sportName:e.target.value})}/>
          <input placeholder="Update Type" className="border p-2 w-full mb-2" onChange={e => setForm({...form, updateType:e.target.value})}/>
          <textarea placeholder="Description" className="border p-2 w-full mb-2" onChange={e => setForm({...form, description:e.target.value})}/>
        </>
      )}
      <button onClick={handleSubmit} className="bg-blue-600 text-white p-2 rounded w-full mt-2">Create</button>
    </div>
  );
}
