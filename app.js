const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
//const Router = express.Router();
require('dotenv/config')

app.use(bodyParser.json());

//midleware

const categoryRoute = require('./routes/categories')
app.use('/categories', categoryRoute)

const restaurantRoute = require('./routes/restaurants')
app.use('/restaurants', restaurantRoute)

const bookingRoute = require('./routes/bookings')
app.use('/bookings', bookingRoute)
  


//connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  () => {
    console.log('connected to db')
  })


app.listen(3001, () => {
  console.log("Server is running at port 3001");
});