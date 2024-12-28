const express = require("express");
const productController = require("../controllers/productController")

const router = express.Router();

router.post('/add-product/:firmId', productController.addProduct);
router.get('/:firmId/products',productController.getProductByFirm)
router.delete('/:productId', productController.deleteProductById)
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(Path2D.join(__dirname, '..', 'uploads', imageName));
})
module.exports = router;// here we need to pass firmId dynamically because , we are getting the firmId from the params in productController.js filr.