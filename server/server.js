//REQUIREMENTS
//native
const path = require('path')
//3rd party
const express = require('express')
const bodyParser = require('body-parser')
//local
const hospital = require('./routes/hospital.js');
const inventory = require('./routes/inventory.js');
const order = require('./routes/order.js');

const app = express()
const port = process.env.PORT || 8080

//MIDDLEWARE
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//ROUTES
app.use('/hospitals', hospital);
app.use('/inventory', inventory);
app.use('/order', order);

//INIT SERVER
app.listen(port, () => {
  console.log(`Started on port ${ port }`);
})