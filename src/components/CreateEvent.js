import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventHour, setEventHour] = useState("");
  const [eventMinute, setEventMinute] = useState("");
  const [eventPeriod, setEventPeriod] = useState("AM");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [religious, setReligious] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !eventName.trim() ||
      !eventDate ||
      !eventHour ||
      !eventMinute ||
      !eventPeriod ||
      !city.trim() ||
      !landmark.trim() ||
      !religious.trim() ||
      !description.trim() ||
      !address.trim() 
    ) {
      setError("All fields including are required.");
      return;
    }

    const eventTime = `${eventHour}:${eventMinute} ${eventPeriod}`;
    
    // Creating FormData to send image file
    const formData = new FormData();
    formData.append("eventName", eventName.trim());
    formData.append("eventDate", eventDate);
    formData.append("eventTime", eventTime);
    formData.append("city", city.trim());
    formData.append("landmark", landmark.trim());
    formData.append("religious", religious.trim());
    formData.append("description", description.trim());
    formData.append("address", address.trim());
    
    try {
      await axios.post("http://localhost:3002/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        title: "Success!",
        text: "Event created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/events");
      });

      // Reset form
      setEventName("");
      setEventDate("");
      setEventHour("");
      setEventMinute("");
      setEventPeriod("AM");
      setCity("");
      setLandmark("");
      setReligious("");
      setDescription("");
      setAddress("");
      setError("");
    } catch (err) {
      console.error("Error creating event:", err);
      setError("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 shadow-lg rounded-md w-96" onSubmit={handleSubmit} encType="multipart/form-data">
        <button
          type="button"
          className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-800"
          onClick={() => navigate("/events")}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">Create Event</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Event Name */}
        <label className="block mb-2">
          Event Name:
          <input type="text" className="w-full p-2 border rounded-md" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        </label>

        {/* Date */}
        <label className="block mb-2">
          Date:
          <input type="date" className="w-full p-2 border rounded-md" value={eventDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setEventDate(e.target.value)} />
        </label>

        {/* Time */}
        <label className="block mb-2">
          Time:
          <div className="flex gap-2">
            <select className="w-1/3 p-2 border rounded-md" value={eventHour} onChange={(e) => setEventHour(e.target.value)}>
              <option value="">Hour</option>
              {[...Array(12).keys()].map((h) => (
                <option key={h + 1} value={h + 1}>{h + 1}</option>
              ))}
            </select>

            <select className="w-1/3 p-2 border rounded-md" value={eventMinute} onChange={(e) => setEventMinute(e.target.value)}>
              <option value="">Minutes</option>
              {[...Array(60).keys()].map((m) => (
                <option key={m} value={String(m).padStart(2, "0")}>{String(m).padStart(2, "0")}</option>
              ))}
            </select>

            <select className="w-1/3 p-2 border rounded-md" value={eventPeriod} onChange={(e) => setEventPeriod(e.target.value)}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </label>

        {/* Address */}
        <label className="block mb-2">
          Address:
          <input type="text" className="w-full p-2 border rounded-md" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>

        {/* City */}
        <label className="block mb-2">
          City:
          <input type="text" className="w-full p-2 border rounded-md" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>

        {/* Landmark */}
        <label className="block mb-2">
          Landmark:
          <input type="text" className="w-full p-2 border rounded-md" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
        </label>

        {/* Religious */}
        <label className="block mb-2">
          Religious:
          <input type="text" className="w-full p-2 border rounded-md" value={religious} onChange={(e) => setReligious(e.target.value)} />
        </label>

        {/* Description */}
        <label className="block mb-2">
          Description:
          <textarea className="w-full p-2 border rounded-md" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        {/* Submit */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
