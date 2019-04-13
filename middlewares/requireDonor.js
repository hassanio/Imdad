const roles = require('../config/roles')

module.exports = (req, res, next) => {
    if (req.authInfo != roles.Donor) {
        return res.status(422).send({ error: "Only donors can perform this operation!" })
    } else {
        next()
    }
}