const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.WhatIsYourName;


const vendorRegister = async(req, res) => {
     const {username, email, password, confirmpassword} = req.body;
     try{
       const vendorEmail = await Vendor.findOne({email});
       if(vendorEmail){
        return res.status(400).json({msg:'Email already taken'})
       }
       if(password !== confirmpassword){
        return res.status(401).send('Password invalid')
       }
       const hashedPassword = await bcrypt.hash(password, 10);

       const newVendor = new Vendor({
        username,
        email, 
        password: hashedPassword, 
        confirmpassword: hashedPassword
       })
       await newVendor.save();

       return res.status(200).json({meg:'User Registered Successfully ..'});
       console.log('register')
     }catch(error){
         console.error(error);
         return res.status(500).send('Internal server error')
     }

}

const vendorLogin = async(req, res) => {
  const {email, password} = req.body;
  try{
      const vendor = await Vendor.findOne({email});
      if(!vendor || !(await bcrypt.compare(password, vendor.password))){ //comparing the password stored in db, and the vendor password coming from req.body
       return res.status(401).json({error: "Invalid username or password"})
      } 
      const token = jwt.sign({vendorId: vendor._id}, secretKey, {expiresIn:"1h"})
       

      return res.status(200).json({success: "Login successfully", token});
      console.log(email, "this is token", token);
  }catch(error){
      console.error(error);
      return res.status(500).send('Internal servere error ..')
  }
}


const getAllVendors = async(req, res) => {
  try{
    const vendors = await Vendor.find().populate('firm'); // trying to get vendor details along with the firm
    return res.json({vendors})
  }catch(error) {
     console.error(error);
     return res.status(500).send('Internal server error..')
  }
}

const getVendorByID = async(req, res) => {
  const vendorId =req.params.apple;        //req.params.id;

  try{
    const vendor = await Vendor.findById(vendorId).populate('firm');
    if(!vendorId){
      return res.status(404).json({error:"Vendor not found"})
    }
    res.status(200).json({vendor})
  }catch(error){
    console.error(error);
    return res.status(500).send('Internal server error..')
  }
}

module.exports = {vendorRegister, vendorLogin, getAllVendors, getVendorByID}