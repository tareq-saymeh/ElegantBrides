const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());


// Load environment variables from .env file
dotenv.config();




// Route:
const authRoutes = require('./routes/authRoutes')

app.use('/api/auth', authRoutes);



mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
      console.log(`http://localhost:${process.env.PORT}`)
    });
  });