const mongoose = require('mongoose');



const User = mongoose.Schema({
    mobile: String,
    password: String,
    name:String,
    stock: Array
}, {
    usePushEach : true
});

module.exports = mongoose.model('User', User);