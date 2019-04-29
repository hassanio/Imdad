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
    app.post('/auth/donor/signup', Authentication.donor_signup)

}