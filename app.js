const express = require('express');
const connectDB = require('./config/db_mongo');
const ENV  = require('./config/env');
const app = express();

// IMPORT ROUTES
const articleRouter = require('./router/Article.router');
const userRouter = require('./router/User.router');
const avisRouter = require('./router/Avis.router');

// CONNECTION MONGO
connectDB(ENV.MONGO_URI, ENV.DB_NAME)

// MIDDLEWARES

// PREFIX
app.use('/api/article', articleRouter);
app.use('/api/user', userRouter);
app.use('/api/avis', avisRouter);

module.exports = app