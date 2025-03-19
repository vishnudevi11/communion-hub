import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function Events() {
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterApplied, setFilterApplied] = useState(false);
  const filterRef = useRef(null);

  const eventsData = [
    {
      _id: "1",
      eventName: "Diwali Festival",
      eventDate: "2024-10-24",
      address: "123 Main St",
      city: "Mumbai",
      landmark: "Near Temple",
      religious: "Hindu",
      description: "A grand celebration of lights and sweets."
    },
    {
      _id: "2",
      eventName: "Eid Celebration",
      eventDate: "2024-04-10",
      address: "456 Market Rd",
      city: "Delhi",
      landmark: "Near Mosque",
      religious: "Muslim",
      description: "Join us for prayers and feast."
    },
    {
      _id: "3",
      eventName: "Christmas Eve",
      eventDate: "2024-12-24",
      address: "789 Church St",
      city: "Goa",
      landmark: "Near Cathedral",
      religious: "Christian",
      description: "Midnight mass and carol singing."
    }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const uniqueReligions = ["All", "Hindu", "Muslim", "Christian"];

  const filteredEvents = eventsData.filter(event => {
    const eventDate = new Date(event.eventDate);
    const today = new Date();

    if (eventDate < today) return false;

    const matchesCategory = category === "All" || event.religious === category;
    let matchesDate = true;
    if (dateFilter === "Today") {
      matchesDate = eventDate.toDateString() === today.toDateString();
    } else if (dateFilter === "This Month") {
      matchesDate = eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
    } else if (dateFilter === "Custom" && fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      matchesDate = eventDate >= from && eventDate <= to;
    }

    return matchesCategory && matchesDate;
  });

  useEffect(() => {
    if (filterApplied && filteredEvents.length === 0) {
      Swal.fire({
        title: "No Events Found",
        text: "No events match your selected filters. Please adjust your filters.",
        icon: "warning",
        showConfirmButton: false,
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
    } else {
      Swal.close();
    }
  }, [filterApplied, filteredEvents]);

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 py-10 px-5 pt-20">
      <h1 className="text-3xl text-center font-bold text-white mb-6">
        Discover and join our upcoming events!
      </h1>
      <div className="max-w-7xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <motion.div key={event._id} className="bg-white shadow-md rounded-lg p-4 cursor-pointer" whileHover={{ scale: 1.05 }}>
            <div className="p-4">
              <h3 className="text-xl font-bold">{event.eventName}</h3>
              <p className="text-gray-600"><strong>Date:</strong> {event.eventDate}</p>
              <p className="text-gray-600"><strong>Address:</strong> {event.address}, {event.city}</p>
              <p className="text-gray-600"><strong>Landmark:</strong> {event.landmark}</p>
              <p className="text-gray-600"><strong>Religion:</strong> {event.religious}</p>
              <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setSelectedEvent(event)}>
                Explore
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-800" onClick={() => setSelectedEvent(null)}>✖</button>
            <h2 className="text-2xl font-bold mt-4">{selectedEvent.eventName}</h2>
            <p className="text-gray-600"><strong>Date:</strong> {selectedEvent.eventDate}</p>
            <p className="text-gray-600"><strong>Address:</strong> {selectedEvent.address}, {selectedEvent.city}</p>
            <p className="text-gray-600"><strong>Landmark:</strong> {selectedEvent.landmark}</p>
            <p className="text-gray-600"><strong>Religion:</strong> {selectedEvent.religious}</p>
            <p className="mt-2 text-gray-700"><strong>Description:</strong> {selectedEvent.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
