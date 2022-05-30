const mongoose = require('mongoose');


const SchemaCategory = mongoose.Schema({
    catName: {
        type:String,
        require: true 
    } ,  
    catNum: {
        type:Number,
        require:true
    } 
}) ;

module.exports = mongoose.model('Categories',SchemaCategory)
