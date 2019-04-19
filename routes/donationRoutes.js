const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })
const roles = require('../config/roles')
const multer = require('multer')
const requireDonor = require('../middlewares/requireDonor')
const requireNGO = require('../middlewares/requireNGO')
const donationsAPI = require('../controllers/donationsAPI')

const configMulter = () => {

    const baseDir = process.env.NODE_ENV === 'production' ? 'build' : 'public'

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, `./${baseDir}/images/donations/`)
        },
        filename: function(req, file, cb) {
            cb(null, req.user.id.toString() + file.originalname)
        }
    })

    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 10 //max file size is 10 MB
        },
        fileFilter: fileFilter
    })

    return upload
}

module.exports = (app) => {

    upload = configMulter()
    //Donor Routes
    app.post('/donate', requireAuth, requireDonor, upload.single('image'), donationsAPI.donateItem)
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

    app.get('/fetchDonation/:id', requireAuth, async (req, res) => {
        if (req.authInfo == roles.Donor) {
            donationsAPI.fetch_donation_donor(req, res)
        }
        else {
            donationsAPI.fetch_donation_ngo(req, res)
        }
    })

    app.get('/confirmPickup/:id', requireAuth, donationsAPI.confirm_pickup)
}