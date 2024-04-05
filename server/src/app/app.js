const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnection } = require('../db/connection');
const routes = require("../routes");
const path = require('path');
require("dotenv").config();

// INSTANCE EXPRESS
const app = express();

// CONFIGURATION CORS
const corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200,
};

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicFolderPath = path.join(__dirname, '../../public');
app.use('/public/images', express.static(path.join(publicFolderPath, 'images')));

// DB CONNECT
dbConnection();

// ROUTES
app.use("/", routes);

module.exports = app;
