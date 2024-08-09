const Reservations = require('../models/Reservations');
const Log = require('../models/log');  // Assuming the Log model is set up similarly to the Reservations model
const Items = require('../models/Items');
const User = require('../models/User');

// Get all future reservations (receivedDate is today or later, and isReceived is false)
const getFutureReservations = async (req, res) => {
    try {
        const reservations = await Reservations.find({
            isReceived: false
        })
        .populate('items') // Populate items field with Item documents
        .populate('userId', 'name email Phone') // Populate userId field with User documents (selecting only name and email)
        .exec();

        res.json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch future reservations' });
    }
};

// Get all under reservations (received but not yet returned)
const getUnderReservations = async (req, res) => {
    try {
        const reservations = await Reservations.find({
            isReceived: true
        })
        .populate('items')
        .populate('userId');

        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch under reservations' });
    }
};

// Update reservation status to mark as received
const updateReservationStatus = async (req, res) => {
    const { id } = req.params;
    const today = new Date().setHours(0, 0, 0, 0);
    try {
        const reservation = await Reservations.findByIdAndUpdate(
            id,
            { isReceived: true,receivedDate:today },
            { new: true }
        )
        .populate('items')
        .populate('userId');

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update reservation status' });
    }
};

// Return a reservation, move it to the log, and delete from reservations
const returnReservation = async (req, res) => {
    const { id } = req.params;

    try {
    const today = new Date().setHours(0, 0, 0, 0);

        const reservation = await Reservations.findById(id)
            .populate('items')
            .populate('userId');
            
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        // Create a log entry
        const logEntry = new Log({
            items: reservation.items,
            userId: reservation.userId,
            receivedDate: reservation.receivedDate,
            returnDate: new Date()
        });
        console.log("History saved");

        await logEntry.save();
        
        // Delete the reservation
        await Reservations.findByIdAndDelete(id);

        res.json({ message: 'Reservation returned and logged successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to return reservation' });
    }
};

module.exports = {
    getFutureReservations,
    getUnderReservations,
    updateReservationStatus,
    returnReservation
};
