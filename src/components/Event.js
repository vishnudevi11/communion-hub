import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function Events() {
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [eventsData, setEventsData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterApplied, setFilterApplied] = useState(false); // Track filter usage
  const filterRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/upload`);
        if (response.ok) {
          const data = await response.json();
          const validData = data.filter(event => event.eventName); // Filter out invalid entries
          setEventsData(validData);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    
    fetchEvents();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const uniqueReligions = ["All", "Hindu", "Muslim", "Christian", ...new Set(eventsData.map(event => event.religious))];

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
    let swalInstance;
  
    if (filterApplied && filteredEvents.length === 0) {
      // Show the SweetAlert if no events are found
      swalInstance = Swal.fire({
        title: "No Events Found",
        text: "No events match your selected filters. Please adjust your filters.",
        icon: "warning",
        showConfirmButton: false,
        allowOutsideClick: true,
        allowEscapeKey: true,
        didOpen: () => {
          document.querySelector(".swal2-container").style.pointerEvents = "none";
        },
      });
    } else {
      // Close the alert if events are found
      Swal.close();
    }
  
    return () => {
      // Cleanup: Close the alert if it exists when the component re-renders
      if (swalInstance) Swal.close();
    };
  }, [filterApplied, filteredEvents]);

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
    setFilterApplied(true); // Mark that the user applied a filter
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 py-10 px-5 pt-20">
      <h1 className="text-3xl text-center font-bold text-white mb-6">
        Discover and join our upcoming events!
      </h1>

      {/* Filter Dropdown (Top-Left Corner) */}
      <div className="flex justify-start">
        <div className="relative" ref={filterRef}>
          <button
            className="px-4 py-2 bg-white text-gray-700 rounded-md shadow-md hover:bg-gray-200"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filter Events
          </button>

          {/* Dropdown Content */}
          {showFilters && (
            <div className="absolute left-0 mt-2 w-64 bg-white bg-opacity-80 p-4 rounded-lg shadow-lg backdrop-blur-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Religion</label>
                <select className="p-2 border rounded w-full" value={category} onChange={handleFilterChange(setCategory)}>
                  {uniqueReligions.map((religion, index) => (
                    <option key={index} value={religion}>{religion}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <select className="p-2 border rounded w-full" value={dateFilter} onChange={handleFilterChange(setDateFilter)}>
                  <option value="All">All Dates</option>
                  <option value="Today">Today</option>
                  <option value="This Month">This Month</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              {dateFilter === "Custom" && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">From Date</label>
                    <input type="date" className="p-2 border rounded w-full" value={fromDate} onChange={handleFilterChange(setFromDate)} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">To Date</label>
                    <input type="date" className="p-2 border rounded w-full" value={toDate} onChange={handleFilterChange(setToDate)} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Events List */}
      <div className="max-w-7xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.map(event => (
  <motion.div key={event._id || Math.random()} className="bg-white shadow-md rounded-lg p-4 cursor-pointer" whileHover={{ scale: 1.05 }}>
    <div className="p-4">
      <h3 className="text-xl font-bold">
        {event.eventName ? event.eventName.charAt(0).toUpperCase() + event.eventName.slice(1) : "Unnamed Event"}
      </h3>
      <p className="text-gray-600"><strong>Date:</strong> {event.eventDate || "Unknown Date"}</p>
      <p className="text-gray-600"><strong>Address:</strong> {event.address || "No Address"}, {event.city || "Unknown City"}</p>
      <p className="text-gray-600"><strong>Landmark:</strong> {event.landmark || "No Landmark"}</p>
      <p className="text-gray-600"><strong>Religion:</strong> {event.religious || "Not Specified"}</p>
      <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setSelectedEvent(event)}>
        Explore
      </button>
    </div>
  </motion.div>
))}

      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
      <button className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-800" onClick={() => setSelectedEvent(null)}>
        ✖
      </button>
      <h2 className="text-2xl font-bold mt-4">
  {selectedEvent?.eventName ? selectedEvent.eventName.charAt(0).toUpperCase() + selectedEvent.eventName.slice(1) : "Unnamed Event"}
</h2>

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
