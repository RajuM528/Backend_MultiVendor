const mongoose = require('mongoose');
const express = require('express');
const dotEnv = require('dotenv');
const vendorRoutes = require('./routes/vendorRoutes');
const app = express();
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes')
const produtRoutes = require('./routes/productRoutes');
const path = require('path');


const PORT = process.env.PORT || 4000; // here we used process.env , when we deployed the app then if we try to acces the app via a link from the deployement then it will open in the port other wise we will get an erro like cannot GET/
dotEnv.config();  // to access the values in .env file 

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB is connected '))
.catch((error) => console.log(error))

app.use(bodyParser.json());
app.use('/vendor', vendorRoutes );
app.use('/firm', firmRoutes);
app.use('/product', produtRoutes);
app.use('/uploads', express.static('uploads')) //standard format for images



app.listen(PORT, () => {
    console.log(`Servere started and running at ${PORT}`);
})

app.use('/', (req, res) => {
    res.send("<h1> Welcome to Raju")
});