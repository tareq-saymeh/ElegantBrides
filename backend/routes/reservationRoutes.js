const express = require('express');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();
const { getFutureReservations, getUnderReservations, updateReservationStatus ,returnReservation, getUserData,getUnAvailableDates} = require('../controllers/reservationController');

// Route to get all future reservations
router.get('/future', getFutureReservations);

router.get('/userData',auth, getUserData);

// Route to get all under reservations
router.get('/under', getUnderReservations);


router.get('/unAvailableDates/:id', getUnAvailableDates);


// Route to update reservation status
router.patch('/:id/status', updateReservationStatus);

// Route to Return reservation status
router.post('/return/:id', returnReservation);


module.exports = router;
