const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })
const roles = require('../config/roles')
const requireDonor = require('../middlewares/requireDonor')
const requireNGO = require('../middlewares/requireNGO')
const donationsAPI = require('../controllers/donationsAPI')

module.exports = (app) => {

    //Donor Routes
    app.post('/donate', requireAuth, requireDonor, donationsAPI.donateItem)
    app.get('/approveNGO/:donation/:ngo', requireAuth, requireDonor, donationsAPI.approve_ngo)


    //NGO Routes
    app.get('/requestDonation/:id', requireAuth, requireNGO, donationsAPI.request_donation)
    app.get('/getApprovedDonations', requireAuth, requireNGO, donationsAPI.fetch_approved_donations)


    //Common Routes
    app.get('/fetchDonations', requireAuth, async (req, res) => {
        if (req.authInfo == roles.Donor) {
            donationsAPI.fetch_donations_donor(req, res)
        }
        else {
            donationsAPI.fetch_donations_ngo(req, res)
        }
    })

    app.get('/confirmPickup/:id', requireAuth, donationsAPI.confirm_pickup)
}