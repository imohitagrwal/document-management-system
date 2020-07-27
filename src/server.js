/**
   @description This file contains server configuration.
   @author Mohit Agarwal
   @date    XX/XX/2020
   @version 1.0.0
*/


const express = require('express'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const  config  = require('./config/environment');
const auth = require('./auth/auth.service');
const morgan = require('morgan');
const cors = require('cors');

const seed = require("./config/seed")
const login = require("./auth/local")

mongoose.Promise = require('bluebird');

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);

mongoose.connection.on('connected', () => {
  console.info('Mongoose connected to', config.mongo.uri);
});
mongoose.connection.on('error', (err) => {
  console.info(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

const app = express();
app.use(cors());
app.use(morgan('short'));
app.use(bodyParser.urlencoded({ extended: true, limit: '32mb' }));
app.use(bodyParser.json({ limit: '32mb' }));

app.use('/auth',login)

app.use('/api', auth.isAuthenticated())
require('./api').default(app);

app.get('/', (req, res) => res.send('Oh!! Yeah.'));

seed();

app.listen(config.port, () => {
  console.info(`The server is running at http://localhost:${config.port}/`);
});

console.info('RESTful API server started on: ');
