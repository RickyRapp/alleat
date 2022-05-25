const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SchemaCategory = new Schema({
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
