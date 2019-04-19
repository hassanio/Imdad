const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const expressValidator = require('express-validator')
const cloudinary = require('cloudinary').v2
const keys = require('./config/keys')

const authRoutes = require('./routes/authRoutes')
const donationRoutes = require('./routes/donationRoutes')
const profileRoutes = require('./routes/profileRoutes')

mongoose.connect(keys.mongoURI)

cloudinary.config({
    cloud_name: keys.CLOUDINARY_CLOUD_NAME,
    api_key: keys.CLOUDINARY_API_KEY,
    api_secret: keys.CLOUDINARY_API_SECRET
})

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
profileRoutes(app)
donationRoutes(app)

//Server Setup
const port = process.env.PORT || 3000
app.listen(port)
console.log('Server listening on:', port)