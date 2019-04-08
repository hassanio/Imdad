const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bycrypt = require('bcrypt-nodejs')

//Define our model
const NGOSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    name: String,
    organization_address: String,
    location: String,
    contact: Number,
    image: Buffer,
    approvedList: [Number]
});

//On Save Hook, encrypt password
//This function is run before saving a NGO to the DB
//DO NOT USE ARROW FUNCTIONS HERE (does not work with 'this')
NGOSchema.pre('save', function(next) {

    let NGO = this;

    //DO NOT save is password same as b4
    if(!NGO.isModified('password')) { return next() }

    //Generate a salt
    bycrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }

        //Hash/encrypt our password with the salt
        bycrypt.hash(NGO.password, salt, null, (err, hashedPassword) => {
            if (err) { return next(err); }

            //Override password with encrypted one
            NGO.password = hashedPassword;

            next();
        })
    });

})

//Create the model class
const ModelClass = mongoose.model('NGO', NGOSchema);

//Export the model
module.exports = ModelClass;