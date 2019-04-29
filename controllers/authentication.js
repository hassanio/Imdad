const Donor = require('../models/Donor');
const NGO = require('../models/NGO')
const keys = require('../config/keys');
const roles = require('../config/roles')
const { validationResult } = require('express-validator/check')
const jwt = require('jwt-simple')

//Generate token for a user
const genToken = (user, role) => {
    return jwt.encode({ sub: user.id, role: role}, keys.secret)
}

exports.ngo_signin = (req, res) => {
    res.send( {token: genToken(req.user, roles.NGO )})
}

//FOR TESTING PURPOSES ONLY!!!
exports.ngo_signup = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).send({error: 'You must provide both an email and a password!'})
    }

    try {

        const newNGO = await new NGO({ email: email, password: password }).save()

        res.json({ token: genToken(newNGO, roles.NGO )})

    }
    catch(err)
    {
        return next(err);
    }
}

exports.donor_signin = (req, res) => {
    //Donor's username and password already verified so provide him/her with the json web token.
    res.send( { token: genToken(req.user, roles.Donor)})

}

exports.donor_signup = async (req, res, next) => {
    
    const { username } = req.body
    
    try {
        //See if a user exists with a given username
        const existingDonor = await Donor.findOne({ username: username });
        
        //If a user with same username exists, then return an error
        if (existingDonor) {
            return res.status(422).send({ error: 'Username already taken!'})
        }

        //else, create and save donor record in db
        const newDonor = new Donor(req.body)

        await newDonor.save()

        //Respond to request indicated that donor was created
        res.json({token: genToken(newDonor, roles.Donor)})
    }
    catch(err) {
        return next(err);
    }

}