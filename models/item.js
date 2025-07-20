const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type: Number,
        default: 0
    },
    marked:{
        type: Boolean,
        default: 0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Item',itemSchema);