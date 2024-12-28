const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
    firmName:{
        type: String,
        required: true,
        unique: true
    },
    area:{
        type:String,
        required: true
    },
    category:{
        type: [
            {
                type:String,
                enum: ['veg','non-veg']
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:['south-indian', 'north-indian', 'chinese', 'bakery']
            }
        ]
    },
    offer:{
        type:String,

    },
    image:{
        type:String
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,  // here we are relating the vendor model to the firm model.
            ref: 'Vendor'  // here the firm is related to the vendor in the database.
        }
    ],
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,  // here we are relating the vendor model to the firm model.
            ref: 'Product'  // here the firm is related to the vendor in the database.
        }
    ]
})

const Firm = mongoose.model('Firm', firmSchema);
module.exports = Firm;
