const roles = require('../config/roles')

module.exports = (req, res, next) => {
    if (req.authInfo != roles.NGO) {
        return res.status(422).send({ error: "Only NGOs can perform this operation!" })
    } else {
        next()
    }
}