import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Event from "./components/Event";
import FetchData from "./components/FetchData";
import CreateEvent from "./components/CreateEvent"; // Import CreateEvent component

export default function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

// Separate Layout Component to handle conditional rendering
function MainLayout() {
  const [events, setEvents] = useState([]); // Initialize state for events
  const location = useLocation(); // Get current path
  const hideNavbarRoutes = ["/create-event"]; // Routes where navbar should be hidden

  return (
    <div >
      {!hideNavbarRoutes.includes(location.pathname) && <Nav />} {/* Hide navbar on /create-event */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/events" element={<Event />} />
        <Route path="/fetch" element={<FetchData />} />
        <Route path="/create-event" element={<CreateEvent addEvent={(event) => setEvents([...events, event])} />} />
      </Routes>
    </div>
  );
}
