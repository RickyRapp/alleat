const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser'); 
require('dotenv/config')

app.use(bodyParser.json());
 
const categoryRoute = require('./NewRoutes/categories')
app.use('/categories', categoryRoute)

const restaurantRoute = require('./NewRoutes/restaurants')
app.use('/restaurants', restaurantRoute)

const bookingRoute = require('./NewRoutes/bookings')
app.use('/bookings', bookingRoute)
  
 
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  () => {
    console.log('connected to db')
  })


app.listen(3001, () => {
  console.log("Server is running at port 3001");
});