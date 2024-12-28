const Product = require("../models/Product");
const multer = require("multer") //for images
const Firm = require("../models/Firm")
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'upload/'); // destination folder where the uploaded images will be stored.
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname)); //Generating a unique filename
    }
});

const upload = multer({storage: storage});

const addProduct = async(req, res) => {
    try{
       const {productName, price, category, bestseller, description} = req.body;
       const image = req.file? req.file.filename: undefined; //for add images 
       
       const firmId = req.params.firmId;
       const firm = await Firm.findById(firmId);
       if(!firm){
        return res.status(404).json({error: "No firm found"})
       }
       const product = new Product ({
        productName, price, category, bestseller, description, firm: firm._id
       })

       const savedProduct = await product.save();

       firm.products.push(savedProduct); //here we are going to push the products to the firm.
       await firm.save() //afetr pushed the products to the firm then save it.

       res.status(200).json(savedProduct)
    }catch(error){
        console.error(error);
        return res.status(500).json({error:"Internal server error.."})
    }
}

// Adding products based on firm id

const getProductByFirm = async(req, res) => {
    try{
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if(!Firm){
            return res.status(404).json({error:"No firm found.."});
        }
        const restaurantName = firm.firmName;
        const products = await Product.find({firm: firmId}); // with the help of find method, trying to get the products from the Profuct model and assigning to firmId
        res.status(200).json({restaurantName, products});
    }catch(error){
        console.error(error);
        return res.status(500).json({error:"Internal server error.."})
    }
}

const deleteProductById = async(req, res) => {
    try{
      const productId = req.params.productId;

      const deleteProduct = await Product.findByIdAndDelete(productId);
      if(!deleteProduct){
        return res.status(404).json({error:"No product found"})
      }
    }catch(error){
        console.error(error);
        return res.status(500).json({error:"Internal server error.."})
    }
}

module.exports = {addProduct: [upload.single('image'),addProduct], getProductByFirm, deleteProductById};
