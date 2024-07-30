const Event = require('../models/event');
const { getWeather } = require('../services/weatherService');

// Show Create Event Form
exports.showCreateEventForm = (req, res) => {
  res.render('events/create'); // Render the view for creating a new event
};

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const { name, date, location, description } = req.body;
    const createdBy = req.session.userId;

    if (!name || !date || !location || !description || !createdBy) {
      req.flash('errorMsg', 'All fields are required');
      return res.redirect('/events/create');
    }

    const newEvent = new Event({ name, date, location, description, createdBy });
    await newEvent.save();
    req.flash('successMsg', 'Event created successfully');
    res.redirect('/events');
  } catch (err) {
    req.flash('errorMsg', 'Failed to create event');
    res.redirect('/events/create');
  }
};


// Get Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy');
    const eventsWithWeather = await Promise.all(events.map(async (event) => {
      const weatherData = await getWeather(event.location);
      return { ...event._doc, weather: weatherData ? weatherData.main : null };
    }));
    res.render('events/view', { events: eventsWithWeather });
  } catch (err) {
    req.flash('errorMsg', 'Failed to retrieve events');
    res.redirect('/');
  }
};

// Get Event Details
exports.getEventDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate('createdBy');
    if (!event) {
      req.flash('errorMsg', 'Event not found');
      return res.redirect('/events');
    }
    const weatherData = await getWeather(event.location);
    res.render('events/detail', { event: { ...event._doc, weather: weatherData ? weatherData.main : null } });
  } catch (err) {
    req.flash('errorMsg', 'Failed to retrieve event details');
    res.redirect('/events');
  }
};

// Edit Event (GET)
exports.editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate('createdBy');
    if (!event) {
      req.flash('errorMsg', 'Event not found');
      return res.redirect('/events');
    }
    res.render('events/edit', { event });
  } catch (err) {
    console.error('Error retrieving event for edit:', err);
    req.flash('errorMsg', 'Failed to retrieve event for edit');
    res.redirect('/events');
  }
};

// Update Event (PUT)
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, location, description } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(id, { name, date, location, description }, { new: true });
    if (!updatedEvent) {
      req.flash('errorMsg', 'Event not found');
      return res.redirect('/events');
    }
    req.flash('successMsg', 'Event updated successfully');
    res.redirect(`/events/${id}`);
  } catch (err) {
    console.error('Error updating event:', err);
    req.flash('errorMsg', 'Failed to update event');
    res.redirect(`/events/${id}/edit`);
  }
};

// Delete Event (DELETE)
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.userId;

    const event = await Event.findById(id);

    if (!event) {
      req.flash('errorMsg', 'Event not found');
      return res.redirect('/events');
    }

    // Check if the user is the creator of the event
    if (event.createdBy.toString() !== userId) {
      req.flash('errorMsg', 'You are not authorized to delete this event');
      return res.redirect('/events');
    }

    await Event.findByIdAndDelete(id);
    req.flash('successMsg', 'Event deleted successfully');
    res.redirect('/events');
  } catch (err) {
    console.error('Error deleting event:', err);
    req.flash('errorMsg', 'Failed to delete event');
    res.redirect('/events');
  }
};
