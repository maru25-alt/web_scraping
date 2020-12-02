const mongoose = require('../config/database.js');

const amazonSchema = new mongoose.Schema({
    title: {
        type: String
    },     
    price:{ 
        type: String,
        default:'Price unavailable'
    },
    rating: {
        type: String,
        default:'Rating unavailable'
    },
    image:{
        type:String
    },
    link:{
        type: String
    }
},{
    timestamps : true
})

const Amazon = mongoose.model('checkingagain', amazonSchema);
module.exports = Amazon;