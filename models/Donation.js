const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define our model
const DonationSchema = new Schema({
    donor: { type: Schema.Types.ObjectId, ref: 'donor', required: true},
    status: { 
        type: String,
        enum: ['NONE', 'PENDING', 'WAITING', 'CONFIRMED'],
        default: 'NONE',
        uppercase: true
    },
    description: String,
    collection_address: String,
    location: { type: String, uppercase: true },
    contact: Number,
    image: Buffer,
    categories: [{
        type: String,
        enum: ['FOOD', 'CLOTHING', 'HOUSEHOLD', 'OTHER'],
        default: 'OTHER',
        uppercase: true
    }],
    requestingNGOs: [ { type: Schema.Types.ObjectId, ref: 'NGO'} ],
    approvedNGO: { type: Schema.Types.ObjectId, ref: 'NGO'},
    hasDonorConfirmed: { type: Boolean, default: false},
    hasNGOConfirmed: { type: Boolean,  default: false}
});

//Create the model class
const ModelClass = mongoose.model('donation', DonationSchema);

//Export the model
module.exports = ModelClass;