const mongoose = require('mongoose');


const SchemaCategory = mongoose.Schema({
    categoryName: {
        type:String,
        require: true 
    } ,  
    categoryNum: {
        type:Number,
        require:true
    } 
}) ;

module.exports = mongoose.model('Categories',SchemaCategory)
