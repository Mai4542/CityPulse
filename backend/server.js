const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const colors = require('colors');


dotenv.config();


const authRoutes = require('./routes/authRoutes');

const reportRoutes = require('./routes/report.routes');

const adminRoutes = require('./routes/adminRoutes');

const riskRoutes = require('./routes/riskIndex.routes');  

const clusteringRoutes = require('./routes/clustering.routes');

const connectDB = require('./config/database');


const AppError = require('./utils/AppError');

const { updateAllPriorityScores } = require('./services/priority.service');

connectDB();

setInterval(async () => {
  await updateAllPriorityScores();
  console.log('Priority scores updated'.green);
}, 24 * 60 * 60 * 1000);

const app = express();



app.use(express.json({ limit: '10kb' }));


app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(helmet());

app.use(mongoSanitize());


app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173',
  credentials: true,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', limiter);


app.use('/api/auth', authRoutes);

app.use('/api/reports', reportRoutes);

app.use('/api/admin', adminRoutes); 

app.use('/api/risk-index', riskRoutes);

app.use('/api/clustering', clusteringRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
   
    if (err.isOperational) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      console.error('ERROR ', err);
      res.status(500).json({
        success: false,
        message: 'Something went wrong!',
      });
    }
  }
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});


process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!  Shutting down...'.red.bold);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});


process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!  Shutting down...'.red.bold);
  console.log(err.name, err.message);
  process.exit(1);
});