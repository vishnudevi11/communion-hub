const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors());

// 🟢 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.error("MongoDB Connection Error ❌", err));

// 🟢 Create Event Schema & Model
const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDate: String,
  eventTime: String,
  city: String,
  landmark: String,
  religious: String,
  description: String,
  address: String,
});

const Event = mongoose.model("Event", eventSchema);

// 🟢 API Route to Save Event in MongoDB (POST)
app.post("/api/upload", async (req, res) => {
  console.log("Received event data:", req.body);
  
  try {
    // Create new event
    const newEvent = new Event(req.body);

    // Save event in MongoDB
    await newEvent.save();

    res.status(201).json({ message: "Event saved successfully!", event: newEvent });
  } catch (err) {
    console.error("Error saving event:", err);
    res.status(500).json({ error: "Failed to save event." });
  }
});

// 🟢 API Route to Fetch Events from MongoDB (GET)
app.get("/api/upload", async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events
    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

// Start Server
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
