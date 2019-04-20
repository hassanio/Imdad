const Donor = require('../models/Donor');
const NGO = require('../models/NGO')
const roles = require('../config/roles')
const DataUri = require('datauri')
const path = require('path')
const cloudinary = require('cloudinary').v2
const _ = require('lodash')

exports.fetchProfile = async (req, res) => {
    const User = req.authInfo == roles.Donor ? Donor : NGO
    const addrString = req.authInfo == roles.Donor ? 'address' : 'organization_address' 
    const filterString = 'name location contact image ' + addrString

    try {
        const profileInfo = await User.findById(req.user.id).select(filterString)
        res.send(profileInfo)
    }
    catch(err) {
        res.status(422).send({ error: err })
    }
}

exports.fetchImage = async (req, res) => {
    const User = req.authInfo == roles.Donor ? Donor : NGO

    try {
        const profileImg = await User.findById(req.user.id).select('image')
        res.send(profileImg)
    }
    catch(err) {
        res.status(422).send({ error: err})
    }
}

exports.updateProfile = async (req, res) => {
    const isDonor = req.authInfo == roles.Donor
    const User = isDonor ? Donor : NGO

    //Base-64 encode the image
    const dUri = new DataUri()
    dUri.format(path.extname(req.file.originalname), req.file.buffer)

    try {
        const user = await User.findById(req.user.id)
        const public_img_id = user.image_id

        //V.IMP: ONLY set folder if no public_id already, otherwise, it will create nested folders
        let upload_options = {width: 800, height: 600, crop: "limit"}
        if (public_img_id) {
            upload_options.public_id = public_img_id
        } else {
            upload_options.folder = isDonor ? 'images/donors' : 'images/ngos'
        }
        const result = await cloudinary.uploader.upload(dUri.content, upload_options)

        //Finally, update donor/ngo
        const updateValues = req.body
        updateValues.image_id = result.public_id
        updateValues.image = result.url 
        await User.findOneAndUpdate({ _id: req.user.id} , updateValues)

        res.send({ success: true })
    }
    catch(err) {
        res.status(422).send({ error: err })
    }
}