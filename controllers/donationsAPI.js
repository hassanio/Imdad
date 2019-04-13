const Donor = require('../models/Donor');
const NGO = require('../models/NGO')
const Donation = require('../models/Donation')
const roles = require('../config/roles')


/////////////////////////////////////////// Donor Functions ///////////////////////////////////////////////////
exports.donateItem = async (req, res) => {

    const donor = req.user
    const donation = req.body

    try {
        const newDonation = await new Donation({...donation, donor: donor.id}).save()
        res.send(JSON.stringify(newDonation))
    }
    catch(err) {
        res.status(422).send({ success: false, error: err })
    }

}

exports.fetch_donations_donor = async (req, res) => {
    const filters = {}
    const donor_id = req.user.id
    filters.donor = donor_id
    if (req.query.statusFilter) {
        filters.status = req.query.statusFilter
    }

    try {
        const donations = await Donation.find(filters)
                                        .select('categories location collection_address')
        res.send(donations)
    }
    catch(err) {
        res.status(422).send( { error: err })
    }
}

exports.approve_ngo = async(req, res) => {
    const donor_id = req.user.id
    const donation_id = req.params.donation
    const ngo_id = req.params.ngo

    //One function is to update the donation status from 'Pending' to 'Waiting'
    const updateDonationStatus = Donation.updateOne({
        _id: donation_id,
        donor: donor_id,
        status: 'PENDING',
        requestingNGOs: ngo_id
    }, {
        $set: { 
            status: 'WAITING', 
            requestingNGOs: [], 
            approvedNGO: ngo_id
        }
    })

    //Other function is to append the donation ID to the approved list of the NGO
    const updateNGO = NGO.updateOne({
        _id: ngo_id
    }, {
        $addToSet: { approvedList: donation_id }
    })

    //Execute both functions/promises in parallel, then return success or error
    Promise.all([updateDonationStatus, updateNGO])
    .then(() => res.send({ success: true }))
    .catch(err => res.status(422).send({ error: err }))

}


///////////////////////////////////////////////////// NGO Functions ////////////////////////////////////
exports.fetch_donations_ngo = async (req, res) => {
    const ngo_id = req.user.id
    const { categoryFilter, locationFilter } = req.query

    const filters = { 
        requestingNGOs: { $nin: [ngo_id] },
        status: { $in: ['NONE', 'PENDING'] }
    }

    if (categoryFilter) {
        filters.categories = categoryFilter
    }
    
    if(locationFilter) {
        filters.location = locationFilter
    }

    try {
        const donations = await Donation.find(filters)
                                        .select('categories location collection_address')
        res.send(donations)
    }
    catch(err) {
        return res.status(422).send({ error: err })
    }
}

exports.request_donation  = async (req, res) => {
    const ngo_id = req.user.id
    const donation_id = req.params.id

    try {

        await Donation.updateOne({
            _id: donation_id,
            status: { $in: ['NONE', 'PENDING'] }
        }, {
            $set: { status: 'PENDING' },
            $addToSet: { requestingNGOs: ngo_id }
        })
        
        res.send({ success: true})
    }
    catch(err) {
        return res.status(422).send({ error: err })
    }
    
}


////////////TODO: THIS DOES NOT WORK!/////
exports.confirm_pickup = async (req, res) => {
    const isDonor = req.authInfo == roles.Donor 
    const user_id = req.user.id
    const donation_id = req.params.id
    
    const filters = { _id: donation_id, status: 'WAITING' }
    if (isDonor) {
        filters.donor = user_id
    } else {
        filters.approvedNGO = user_id
    }

    try {
        const thisDonation = await Donation.findOne(filters)

        //Set hasDonorConfirmed or hasNGOConfirmed to true
        if (isDonor) {
            thisDonation.hasDonorConfirmed = true
        } else {
            thisDonation.hasNGOConfirmed = true
        }

        //If both have confirmed, then
        //1.) Set donation status to 'CONFIRMED'
        //2.) Remove the donation from the NGO's approved list
        if(thisDonation.hasDonorConfirmed && thisDonation.hasNGOConfirmed) {
            console.log("Both have confirmed")
            const updateNGO = NGO.updateOne({ _id: user_id }, { $pull : { approvedList: donation_id }})
            thisDonation.status = 'CONFIRMED'

            //Save changes to donation and NGO
            await thisDonation.save()
            await updateNGO

            res.send({ success: true })

        } 
        //Otherwise, just save the changes made to the donation
        else {
            console.log("Both have not yet confirmed donations!")
            await thisDonation.save()
            res.send({ success: true })
        }
    }
    catch(err) {
        return res.status(422).send({ error: err })
    }
}