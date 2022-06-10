//routes
const express = require('express');
const router = express.Router();
const Restaurants = require('../models/Restaurants')  


//get all Restaurants 
router.get('/', async (req, res) => {
    try{
        const restaurant = await Restaurants.find()
        res.json(restaurant)
    }
    catch
        (err){
            res.status(500).json({message:err.message})
        } 
 });
  

 //get one restaurant
router.get('/:id', getRestaurant,(req,res)=> {
    res.json(res.restaurant)
})


 ///updating one restaurant

 router.patch('/:id', getRestaurant, async (req, res) => {
    if(req.body.name!=null){
        res.restaurant.name = req.body.name
    }
    if(req.body.categoryNum!=null){
        res.restaurant.categoryNum = req.body.categoryNum
    }
    if(req.body.address!=null){
        res.restaurant.address = req.body.address
    }
    if(req.body.restaurantNum!=null){
        res.restaurant.restaurantNum = req.body.restaurantNum
    }
    try{
        const updatedResName = await res.restaurant.save()
        res.json(updatedResName)
    }
    catch (err){
        res.status(400).json({message:err.message})
    }
})

//delete one restaurant
router.delete('/:id', getRestaurant, async (req, res) => {
    try{
        await res.restaurant.remove()
        res.json({message: "deleted successfully!"})
    }
    catch
        (err){
            res.status(500).json({message:err.message})
        } 
 });

 async function getRestaurant(req, res, next){
    let restaurant 
    try {
        restaurant = await Restaurants.findById(req.params.id)
        if(restaurant==null){
            return res.status(404).json({message: "cannot find restaurant"})
        }
    
    }
    catch (err){
        return res.status(500).json({message:err.message})
    }
    res.restaurant = restaurant
    //console.log(restaurant)
    next()
    }
 

 //post something
 router.post('/', async (req, res) => {

    let highestRes
    try {
        highestRes = await Restaurants.find().sort({restaurantNum:-1}).limit(1) 
    }
    catch (err){
        return res.status(500).json({message:err.message})
    }
    if (highestRes && !highestRes.length){
        res.highestRes = 0
    }
    else {
        res.highestRes = highestRes[0].restaurantNum 
    }

    console.log(req.body.categoryNum)
    const restaurant = new Restaurants({
        name: req.body.name,
        categoryNum: req.body.categoryNum,
        address: req.body.address,
        restaurantNum: (res.highestRes)+1
    })
    try{
        const newRestaurant = await restaurant.save() 
        res.status(201).json(newRestaurant)
    }
    catch
        (err){
            res.status(400).json({message:err.message})
        } 
 });
  
router.post('/', (req,res) => {
    const restaurant = new Post({
        name: req.body.newRestaurantName,
        categoryNum: req.body.newAssociatedCategory,
        address: req.body.newRestaurantAddress,
        restaurantNum: req.body.restaurantNum 
    });

    restaurant.save()
    .exec()
    .then(data => {
        res.json(data);
    }) 
 }); 


module.exports = router;