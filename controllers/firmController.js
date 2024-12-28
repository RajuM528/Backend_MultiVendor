const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');



const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'upload/'); // destination folder where the uploaded images will be stored.
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname)); //Generating a unique filename
    }
});

const upload = multer({storage: storage});

const addFirm = async(req, res) => {
    try{
    const {firmName, area, category, region, offer} = req.body;
    
    const image = req.file? req.file.filename: undefined; //for add images 

    //here we are adding firm to the vendor based on the vendor id. so 

    const vendor = await Vendor.findById(req.vendorId)
    if(!vendor){
        return res.status(404).send('Vendor not found..')
    }
    const firm = new Firm({
        firmName, area, category, region, offer, image, vendor: vendor._id
    })

    const savedFirm = await firm.save();
    vendor.firm.push(savedFirm);

    await vendor.save();
    
    return res.status(200).json({message: 'Firm Added successfully'})
    }catch(error){
      console.error(error);
      return res.status(500).send('Inetrnal Server Error..')
    }
}

const deleteFirmById = async(req, res) => {
    try{
      const firmId = req.params.firmId;

      const deleteProduct = await Firm.findByIdAndDelete(firmId);
      if(!deleteProduct){
        return res.status(404).json({error:"No product found"})
      }
    }catch(error){
        console.error(error);
        return res.status(500).json({error:"Internal server error.."})
    }
}

module.exports = {addFirm: [upload.single('image'), addFirm], deleteFirmById} // need to export like this when we have image