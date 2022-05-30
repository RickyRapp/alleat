const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    name: {
        type:String,
        require:true
    } ,
    catNum:  {
        type:mongoose.Schema.Types.ObjectId,ref:'Categories'
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