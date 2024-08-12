const express = require('express');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();
const { getFutureReservations, getUnderReservations, updateReservationStatus ,returnReservation} = require('../controllers/reservationController');

// Route to get all future reservations
router.get('/future', getFutureReservations);

// Route to get all under reservations
router.get('/under', getUnderReservations);

// Route to update reservation status
router.patch('/:id/status', updateReservationStatus);

// Route to Return reservation status
router.post('/return/:id', returnReservation);


module.exports = router;
