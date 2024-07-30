// eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');
const authMiddleware = require('../middleware/auth');

// Route to display the create event form
router.get('/create', authMiddleware.isLoggedIn, eventController.showCreateEventForm);

// Route to handle form submission for creating a new event
router.post('/', authMiddleware.isLoggedIn, eventController.createEvent);

// Other routes
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventDetails);
router.get('/:id/edit', authMiddleware.isLoggedIn, eventController.editEvent);
router.put('/:id', authMiddleware.isLoggedIn, eventController.updateEvent);
router.delete('/:id', authMiddleware.isLoggedIn, eventController.deleteEvent);

module.exports = router;
