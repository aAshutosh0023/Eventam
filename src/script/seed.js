// src/seed.js
const mongoose = require('mongoose');
const User = require('../models/user');

// Replace with your MongoDB URI
const MONGO_URI = 'mongodb://127.0.0.1:27017/assignment';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');

    // Sample users to insert
    const sampleUsers = [
      { name: 'Alice Johnson', email: 'alice@example.com', password: 'password123' },
      { name: 'Bob Smith', email: 'bob@example.com', password: 'password456' },
      { name: 'Charlie Brown', email: 'charlie@example.com', password: 'password789' }
    ];

    // Insert sample users
    await User.insertMany(sampleUsers);
    console.log('Sample data inserted successfully');

  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
}

seedDatabase();
