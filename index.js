const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const expressValidator = require('express-validator')
const keys = require('./config/keys')

const authRoutes = require('./routes/authRoutes')
const donationRoutes = require('./routes/donationRoutes')

mongoose.connect(keys.mongoURI)

const app = express();

//App setup
app.use(morgan('combined'));
app.use(bodyParser.json())
app.use(expressValidator())

app.use('/images', express.static('images'))
//Define all routes
authRoutes(app)
donationRoutes(app)

//Server Setup
const port = process.env.PORT || 3000
app.listen(port)
console.log('Server listening on:', port)