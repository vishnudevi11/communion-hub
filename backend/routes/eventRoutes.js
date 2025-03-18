const express = require('express');
const router = express.Router();
const Event = require('../models/eventForm');  // No need for multer since we removed the file upload

// API endpoint to create event
router.post("/api/upload", async (req, res) => {
  console.log('Received form data:', req.body); // Log form data
  
  const { eventName, eventDate, eventTime, city, landmark, religious, description, address } = req.body;

  const newEvent = new Event({
    eventName,
    eventDate,
    eventTime,
    city,
    landmark,
    religious,
    description,
    address,
  });

  try {
    await newEvent.save();
    res.status(200).json({ message: "Event created successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error creating event", error: err });
  }
});

module.exports = router;
