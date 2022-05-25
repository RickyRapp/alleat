const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    name: {
        type:String,
        require:true
    } ,
    catNum:  {
        type:Number,
        require:true 
    } ,
    address: {
        type:String,
        require:true
    } ,
    restaurantNum:{
        type:Number,
        require:true
    } 
})

module.exports = mongoose.model('Restaurants',RestaurantSchema)