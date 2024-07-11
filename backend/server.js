const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();


// Routes:
const adminRoute = require('./routes/adminRoutes')
const cartRoute = require('./routes/cartRoutes')
const itemsRoute = require('./routes/itemRoutes')
const logRoute = require('./routes/logRoutes')
const reservationsRoute = require('./routes/reservationRoutes')
const userRoute = require('./routes/userRoutes')


const app = express();

// Middleware
app.use(express.json());
app.use('/', adminRoute);
app.use('/cart', cartRoute);
app.use('/items', itemsRoute);
app.use('/log', logRoute);
app.use('/reservations', reservationsRoute);
app.use('/user', userRoute);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
    // http://localhost:3000/Cart
});