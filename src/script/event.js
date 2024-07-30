const mongoose = require('mongoose');
const Event = require('../models/event'); // Adjust the path if needed

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/assignment', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected successfully');
    createEvent();
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Example of creating an event
const createEvent = async () => {
  try {
    const newEvent = new Event({
      name: 'Tech Conference 2024',
      date: new Date('2024-09-15'),
      location: 'Convention Center, Cityville',
      description: 'A conference on the latest in tech.',
      createdBy: '60d21b4667d0d8992e610c85' // Example User ID
    });
    
    const savedEvent = await newEvent.save();
    console.log('Event created successfully:', savedEvent);
  } catch (err) {
    console.error('Error creating event:', err);
  } finally {
    mongoose.connection.close(); // Close the connection after operation
  }
};
