const express = require('express');
const router = express.Router();
const Bookings = require('../models/Bookings')  
 
router.get('/', async (req, res) => {
    try{
        const booking = await Bookings.find()
        res.json(booking)
    }
    catch
        (err){
            res.status(500).json({message:err.message})
        } 
 });
    
 router.get('/',  async function getBooking(req, res){
    let booking 
    try {
        booking = await Bookings.find({ 'restaurantNum': req.query.restaurantNum})
         if(!booking){
            return res.status(404).json({message: "cannot find booking!!"})
        }
    
    }
    catch (err){
        return res.status(500).json({message:err.message})
    }
    res.json(booking)
    } )



 router.patch('/:id', getBooking, async (req, res) => {
    if(req.body.clientName){
        res.booking.clientName = req.body.clientName
    }
    if(req.body.bookingNum){
        res.booking.bookingNum = req.body.bookingNum
    }
    if(req.body.date){
        res.booking.date = req.body.date
    }
    if(req.body.restaurantNum){
        res.booking.restaurantNum = req.body.restaurantNum
    } 
    try{
        const updatedBooking = await res.booking.save()
        res.json(updatedBooking)
    }
    catch (err){
        res.status(400).json({message:err.message})
    }
})
 
router.delete('/:id', getBooking, async (req, res) => {
    try{
        await res.booking.remove()
        res.json({message: "deleted successfully!"})
    }
    catch
        (err){
            res.status(500).json({message:err.message})
        } 
 });

 async function getBooking(req, res, next){
    let booking 
    try {
        booking = await Bookings.findById(req.params.restaurantNum)
        if(!booking){
            return res.status(404).json({message: "cannot find booking..."})
        }
    
    }
    catch (err){
        return res.status(500).json({message:err.message})
    }
    res.booking = booking 
    next()
    }
  
 router.post('/', async (req, res) => {

    let highestBooking
    try {
        highestBooking = await Bookings.find().sort({bookingNum:-1}).limit(1) 
    }
    catch (err){
        return res.status(500).json({message:err.message})
    }
    if (highestBooking && !highestBooking.length){
        res.highestBooking = 0
    }
    else {
        res.highestBooking = highestBooking[0].bookingNum 
    }

    const booking = new Bookings({
        clientName: req.body.clientName,
        restaurantNum: req.body.restaurantNum,
        date: req.body.date,
        bookingNum: (res.highestBooking)+1
    })
    try{
        const newBooking = await booking.save() 
        res.status(201).json(newBooking)
    }
    catch
        (err){
            res.status(400).json({message:err.message})
        } 
 });
 
 
 
module.exports = router;