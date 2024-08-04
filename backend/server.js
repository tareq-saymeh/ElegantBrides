const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

dotenv.config();

const app = express();
const authRoutes = require('./routes/authRoutes');
const { loginMiddleware } = require('./middleware/authMiddleware');

// Middleware
app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3 * 60 * 60 * 1000 }, // 3 hours
  })
);

// Routes
app.use(loginMiddleware);
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
      console.log(`http://localhost:${process.env.PORT}`);
    });
  });
