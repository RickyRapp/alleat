const mongoose = require('mongoose'); 

const BookingSchema = mongoose.Schema({
    clientName: {
        type:String,
        require:true 
    } , 
    bookingNum:  {
        type:Number, 
        require:true
    } ,
    date: {
        type: Date,
        require:true
    } ,
    restaurantNum:{
        type:mongoose.Schema.Types.ObjectId,ref:'Restaurants'
    } 
})

module.exports = mongoose.model('Bookings',BookingSchema)