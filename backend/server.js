const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/report.routes');
const adminRoutes = require('./routes/adminRoutes');
const riskRoutes = require('./routes/riskIndex.routes');
const clusteringRoutes = require('./routes/clustering.routes');
const heatmapRoutes = require('./routes/heatmap.routes');
const contactRoutes = require('./routes/contact.routes');

const connectDB = require('./config/database');
const AppError = require('./utils/AppError');

connectDB();

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(helmet());
app.use(mongoSanitize());

app.use(cors({
  origin: 'https://city-pulse-front-end.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.options('*', cors());

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
app.use('/api/heatmap', heatmapRoutes);
app.use('/api/contact', contactRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;