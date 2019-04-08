const passport = require('passport')
const bcrypt = require('bcrypt-nodejs')
const Donor = require('../models/Donor')
const NGO = require('../models/NGO')
const keys = require('../config/keys');
const roles = require('../config/roles')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local')


//We need a local strategy for signing donors in
const donorLocalOptions = {usernameField: 'username'}
const donor_local_signin = new LocalStrategy(donorLocalOptions, async (username, password, done) => {
    //We need verify username and password of donor
    //If credentials verified, call done with donor
    //else call done with false
    try {

        const donor = await Donor.findOne({ username: username });

        if (!donor) { return done(null, false) }

        //Compare hashedPassword with the input password and only authenticate if both match
        bcrypt.compare(password, donor.password, (err, isSame) => {
            if (err) { return done(err) }

            if (!isSame) { return done(null, false); }

            return done(null, donor);
        })

    }
    catch(err) {
        return done(err, false)
    }

})

//We need a separate local strategy for signing NGOs in
const ngoLocalOptions = { usernameField: 'email' }
const ngo_local_signin = new LocalStrategy(ngoLocalOptions, async (email, password, done) => {

    try {

        console.log("HERE")
        const ngo = await NGO.findOne({ email: email });

        if (!ngo) { return done(null, false) }

        bcrypt.compare(password, ngo.password, (err, isSame) => {
            if(err) { return done(err) }

            if (!isSame) { return done(null, false) }

            return done(null, ngo)

        })
    }
    catch(err) {
        return done(null, false)
    }
})

//Setup jwt options
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.secret
}

//Create a JWT strategy
//Note: This works like a middleware i.e passport will take the req object, extract the jwt token from it
//and decrypt it to provide the payload which we will then use to authenticate our user
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {

    //Decide whether user is a donor or an ngo based on the value of the role field in the payload
    const User = payload.role == roles.Donor ? Donor : NGO;

    try
    {
        //See if User ID in payload exists in database
        const user = await User.findById(payload.sub);

        //If it exists, call 'done' with that
        if (user) {
            done(null, user, payload.role);
        }
        //Otherwise, call 'done' without it
        else {
            done(null, false);
        }

    }
    catch(err)
    {
        return done(err, false);
    }

})

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use('donor-local', donor_local_signin)
passport.use('ngo-local', ngo_local_signin)