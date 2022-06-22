//routes
const express = require('express');
const router = express.Router();
const Restaurants = require('../models/Restaurants')   
const { schema } = require('../models/Restaurants'); 
const cors = require("cors");  

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

router.use(cors()); 

 router.get('/',  async function getRestaurant(req, res){
    let restaurant    
    try { 
        if (!req.query.categoryNum && !req.query.restaurantNum){
            restaurant = await Restaurants.find()  
        }
        else{
            if(req.query.restaurantNum){ 
                restaurant = await Restaurants.findOne({ 'restaurantNum': req.query.restaurantNum})
            }
            else{ 
                restaurant = await Restaurants.find({ 'categoryNum': req.query.categoryNum})
            }
        }
         if(!restaurant){
            return res.status(404).json({message: "cannot find restaurant!!"})
        }
    
    }
    catch (err){
        return res.status(500).json({message:err.message})
    } 
    res.json(restaurant)
} )
 
router.post('/', async (req, res) => {

    console.log("posting")

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
  
 
router.get('/:id', getRestaurant,(req,res)=> {
    res.json(res.restaurant)
})
 
  
 
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
            return res.status(404).json({message: "cannot find restarant"})
        }
    
    }
    catch (err){
        return res.status(500).json({message:err.message})
    }
    res.restaurant = restaurant
    next()
}

router.patch('/:id', getRestaurant, async (req, res) => { 
    console.log(req.body)  
    if (req.body.name){ 
       res.restaurant.name = req.body.name
    }
    if (req.body.categoryNum){
       res.restaurant.categoryNum = req.body.categoryNum
    }
    if (req.body.address){
       res.restaurant.address = req.body.address
    }
    if (req.body.restaurantNum){
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
//router.patch('/:id', getRestaurant, async (req, res) => { 
 //   console.log(req.body)
  ///  const body = req.body  
    //res.body = body
   // console.log(`res.restaurant ${body}`)
    //try{
    //    const updatedResName = await res.body.save()
     //   res.json(updatedResName)
   // }
   // catch (err){
     //   res.status(400).json({message:err.message})
   // }
//})

    

module.exports = router;

 