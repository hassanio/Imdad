const Authentication = require('../controllers/authentication')
const passportService = require('../services/passport')
const passport = require('passport')
const { body } = require('express-validator/check') 

const requireAuth = passport.authenticate('jwt', { session: false })
const verifyDonorSignin = passport.authenticate('donor-local', { session: false })
const verifyNGOSignin = passport.authenticate('ngo-local', { session: false })

module.exports = (app) => {

    app.get('/', requireAuth, (req, res) => {
        console.log(req.authInfo)
        res.send({hi: 'there'})
    })

    app.post('/auth/ngo/signin', verifyNGOSignin, Authentication.ngo_signin)
    app.post('/auth/ngo/signup', Authentication.ngo_signup)
    
    app.post('/auth/donor/signin', verifyDonorSignin, Authentication.donor_signin)

    const validateDonor = () => {
        return [
            body('username', 'Username must be provided!').exists(),

            body('password', 'Password cannot be empty.').exists().isLength({ min: 1 }),

            body('name', 'You must provide your name.').isLength({ min: 1 }),

            body('address', 'Address is not provided.').isLength( { min: 1}),

            body('location', 'Invalid Location').isIn(['Lahore', 'Islamabad', 'Karachi']),

            body('contact').exists().isNumeric().withMessage('Contact Number is Invalid').toInt()
        ]
    }
    app.post('/auth/donor/signup', validateDonor(), Authentication.donor_signup)

}