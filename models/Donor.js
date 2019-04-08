const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bycrypt = require('bcrypt-nodejs')

//Define our model
const donorSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
    name: String,
    address: String,
    location: String,
    contact: Number,
    image: Buffer,
    donations: [Number]
});

//On Save Hook, encrypt password
//This function is run before saving a donor to the DB
//DO NOT USE ARROW FUNCTIONS HERE (does not work with 'this')
donorSchema.pre('save', function(next) {

    let donor = this;

    //DO NOT re-encrypt password if it is isn't modified
    if (!donor.isModified('password')) { return next() }

    //Generate a salt
    bycrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }

        //Hash/encrypt our password with the salt
        bycrypt.hash(donor.password, salt, null, (err, hashedPassword) => {
            if (err) { return next(err); }

            //Override password with encrypted one
            donor.password = hashedPassword;

            next();
        })
    });

})

//Create the model class
const ModelClass = mongoose.model('donor', donorSchema);

//Export the model
module.exports = ModelClass;