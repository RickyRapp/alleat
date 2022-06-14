const express = require('express')
const path = require('path') 
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('dotenv/config')


app.use(bodyParser.json());

//midleware

const categoryRoute = require('./NewRoutes/categories')
app.use('/categories', categoryRoute)

const restaurantRoute = require('./NewRoutes/restaurants')
app.use('/restaurants', restaurantRoute)

const bookingRoute = require('./NewRoutes/bookings')
app.use('/bookings', bookingRoute)
  


//connect to db

const uri = "mongodb+srv://RickyR:Rbs101094!@cluster0.g8isb.mongodb.net/alleat?retryWrites=true&w=majority";
mongoose.connect(
  uri,
  { useNewUrlParser: true },
  () => {
    console.log('connected to db')
  })
 
app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running at port");
});

 

  
