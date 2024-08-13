const Reservations = require('../models/Reservations');
const mongoose = require('mongoose');
const Log = require('../models/log');  // Assuming the Log model is set up similarly to the Reservations model
const Items = require('../models/Items');
const User = require('../models/User');

const getUserData = async (req, res) => {
    try {
        // Assuming req.user contains the user ID
        const reservations = await Reservations.find({ userId: req.user })
            .populate('items.itemId') // Populate items field with Item documents
            .exec();

        res.json(reservations);
    } catch (error) { // Pass the error object to the catch block
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch this user\'s reservations' });
    }
};



// Get all future reservations (receivedDate is today or later, and isReceived is false)
const getFutureReservations = async (req, res) => {
    try {
        const reservations = await Reservations.find({
            isReceived: false
        })
        .populate('items.itemId') // Populate items field with Item documents
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
        .populate('items.itemId') // Populate items field with Item documents
        .populate('userId', 'name email Phone') // Populate userId field with User documents (selecting only name and email)
        .exec();

        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch under reservations' });
    }
};

// Update reservation status to mark as received
const updateReservationStatus = async (req, res) => {
    const { id } = req.params;
    const now = new Date(); // Get current date and time

    try {
        // Find the reservation and populate necessary fields
        const reservation = await Reservations.findById(id).populate('items').populate('userId').exec();
        
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        // Check if the reservation has already been received
        if (reservation.isReceived) {
            return res.status(400).json({ error: 'Reservation already received' });
        }

        
            // Update the reservation for rent-able items
            reservation.isReceived = true;
            reservation.items.forEach(item => {
                if (item.itemId.RentAble) { 
                    item.receivedDate = now; // Set the receivedDate to the current date and time
                }
            });

            // Save the updated reservation
            await reservation.save();

            res.json(reservation);
        
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ error: 'Failed to update reservation status' });
    }
};





// Return a reservation, move it to the log, and delete from reservations
const returnReservation = async (req, res) => {
    const { id } = req.params;
    const now = new Date(); // Get current date and time

    try {
        // Find the reservation and populate necessary fields
        const reservation = await Reservations.findById(id).populate('items').populate('userId').exec();
        
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        // Update returnDate for each item if the item is rent-able
        reservation.items.forEach(item => {
            if (item.itemId.RentAble) { // Check if the item is rent-able
                item.returnDate = now; // Set the returnDate to the current date and time
            }
        });

        // Save the updated reservation
        await reservation.save();

        // Create a log entry
        const logEntry = new Log({
            items: reservation.items,
            userId: reservation.userId,
            receivedDate: reservation.receivedDate,
            returnDate: now
        });
        console.log("History saved");

        await logEntry.save();

        // Delete the reservation
        await Reservations.findByIdAndDelete(id);

        res.json({ message: 'Reservation returned and logged successfully' });
    } catch (error) {
        console.error('Failed to return reservation:', error);
        res.status(500).json({ error: 'Failed to return reservation' });
    }
};


module.exports = {
    getFutureReservations,
    getUnderReservations,
    updateReservationStatus,
    returnReservation,
    getUserData
};
