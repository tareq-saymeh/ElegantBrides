const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Route:
const authRoutes = require('./routes/authRoutes')
const cartRoutes = require('./routes/cartRoutes')
const itemsRoutes = require('./routes/itemRoutes')
const logRoutes = require('./routes/logRoutes')
const reservationsRoutes = require('./routes/reservationRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express();

// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
// app.use('/', authRoute);
app.use('/cart', cartRoutes);
app.use('/items', itemsRoutes);
app.use('/log', logRoutes);
app.use('/reservations', reservationsRoutes);
app.use('/user', userRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
});