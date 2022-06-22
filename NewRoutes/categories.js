//routes
const express = require('express');
const { schema } = require('../models/Categories');
const router = express.Router();
const Categories = require('../models/Categories') 
const cors = require("cors");

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

router.use(cors());

//get all categories  
 router.get('/', async (req, res) => {
    try{
        const category = await Categories.find()
        res.json(category)
    }
    catch
        (err){
            res.status(500).json({message:err.message})
        } 
 });
  

 //get one category
router.get('/:id', getCategory,(req,res)=> {
    res.json(res.category)
})
 
 ///updating one category

 router.patch('/:id', getCategory, async (req, res) => {
    if(req.body.categoryName!=null){
        res.category.categoryName = req.body.categoryName
    }
    if(req.body.categoryNum!=null){
        res.category.categoryNum = req.body.categoryNum
    }
    try{
        const updatedCategoryName = await res.category.save()
        res.json(updatedCategoryName)
    }
    catch (err){
        res.status(400).json({message:err.message})
    }
})

//delete one category
router.delete('/:id', getCategory, async (req, res) => {
    try{ 
        await res.category.remove()
        res.json({message: "deleted successfully!"})
    }
    catch
        (err){
            res.status(500).json({message:err.message})
        } 
 });

 async function getCategory(req, res, next){
    let category 
    try {
        category = await Categories.findById(req.params.id)
        if(!category){
            return res.status(404).json({message: "cannot find category"})
        }
    
    }
    catch (err){
        return res.status(500).json({message:err.message})
    }
    res.category = category 
    next()
}
  
 //post something
 router.post('/', async (req, res) => {

    let highestCat 
    try {
        highestCat = await Categories.find().sort({categoryNum:-1}).limit(1) 
    }
    catch (err){
        return res.status(500).json({message:err.message})
    }
    res.highestCat = highestCat.length>0 ? highestCat[0].categoryNum : 0
    console.log(req.body.category)
    const category = new Categories({ 
        categoryName: req.body.category,
        categoryNum: (res.highestCat)+1
    })
    try{
        const newCategory = await category.save() 
        res.status(201).json(newCategory)
    }
    catch
        (err){
            //console.log(res.status(400).json({message:err.message}))
            res.status(400).json({message:err.message})
        } 
 });
   

module.exports = router;