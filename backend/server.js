const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const bodyParser = require('body-parser');
const upload = require('./middleware/multerConfig');
dotenv.config();

const app = express();
const authRoutes = require('./routes/authRoutes');
const ItemsRoutes = require('./routes/itemRoutes');
const { loginMiddleware } = require('./middleware/authMiddleware');
const ReservationsRoutes = require('./routes/reservationRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const Logs = require('./routes/logRoutes');
const cartRoutes = require('./routes/cartRoutes');
const custom = require('./routes/customizationRoutes');



// Middleware
app.use(cors({
  origin: 'http://localhost:3001', 
  credentials: true, 
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads'))); 

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge:  60 * 60 * 1000 }, 
  })
);

// Routes
app.use(loginMiddleware);
app.use('/api/auth', authRoutes);
app.use('/api/items', ItemsRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/reservations', ReservationsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/logs', Logs);
app.use('/api/cart', cartRoutes);
app.use('/api/custom', custom);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
      console.log(`http://localhost:${process.env.PORT}`);
    });
  });
