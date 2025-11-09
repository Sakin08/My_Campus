import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function Events() {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Events</h2>
        {user && <Link to="/events/new" className="bg-blue-600 text-white px-3 py-1 rounded">Create Event</Link>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map(event => (
          <div key={event._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{event.eventName}</h3>
            <p>{event.description}</p>
            <p>Organizer: {event.organizer}</p>
            <p>Date: {dayjs(event.date).format("DD MMM YYYY")}</p>
            <p>Time: {event.time}</p>
            <p>Venue: {event.venue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
