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

// if (process.env.NODE_ENV === 'production') {
//     app.use('/build', express.static('build'))
// } else {
//     app.use('/public', express.static('public'))
// }

//Define all routes
authRoutes(app)
donationRoutes(app)

//Server Setup
const port = process.env.PORT || 3000
app.listen(port)
console.log('Server listening on:', port)