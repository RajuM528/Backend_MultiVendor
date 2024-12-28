const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();

const secretKey = process.env.WhatIsYourName;

const verifyToken = async(req, res, next) => {
    const token = req.headers.token;
    if(!token){
        return res.status(401).json({error:"Token is required"})
    }
    try{
        //here we need to decod the token and need to compare that with the vendor id in the db.
       const decoded = jwt.verify(token, secretKey) // decoding the token with the help of secretkey
       const vendor = await Vendor.findById(decoded.vendorId); // finding the vendor in the database with the help of the id.
     if(!vendor){
        return res.status(404).json({error: "vendor not found"})
     }
       req.vendorId = vendor._id  //verifying the id coming from req by comparing wit the vendor id in the database.

       next()
    }catch(error){
       console.error(error);
       return res.status(500).json({error: "Invalid Token"}) 
    }
}

module.exports = verifyToken;