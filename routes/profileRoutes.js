const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })
const roles = require('../config/roles')
const multer = require('multer')
const requireDonor = require('../middlewares/requireDonor')
const requireNGO = require('../middlewares/requireNGO')
const profileAPI = require('../controllers/profileAPI')

const configMulter = () => {
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }

    const upload = multer({
        limits: {
            fileSize: 1024 * 1024 * 10 //max file size is 10 MB
        },
        fileFilter: fileFilter
    })

    return upload
}

module.exports = (app) => {

    upload = configMulter()

    //Common Routes
    app.get('/fetchProfile', requireAuth, profileAPI.fetchProfile)
    app.get('/fetchProfileImage', requireAuth, profileAPI.fetchImage)
    app.post('/updateProfile', requireAuth, upload.single('image'), profileAPI.updateProfile)
}