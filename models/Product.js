const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg', 'non-veg']
            }
        ]
    },
    image:{
        type: String
    },
    bestseller:{
        type: String,
    },
    description:{
        type: String
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,  // here we are relating the vendor model to the firm model.
            ref: 'Firm'  // here the firm is related to the vendor in the database.
        }
    ]
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product