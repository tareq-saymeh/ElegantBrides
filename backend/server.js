const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const authRoutes = require('./routes/authRoutes');
const ItemsRoutes = require('./routes/itemRoutes');
const { loginMiddleware } = require('./middleware/authMiddleware');

// Middleware
app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads'))); // Serve static files from the uploads directory
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge:  60 * 60 * 1000 }, // 3 hours
  })
);

// Routes
app.use(loginMiddleware);
app.use('/api/auth', authRoutes);
app.use('/api/items', ItemsRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
      console.log(`http://localhost:${process.env.PORT}`);
    });
  });
