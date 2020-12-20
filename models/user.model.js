const { text } = require('body-parser');
const mongoose = require('mongoose');



const User = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    age: Number,
    mobile: String,
    VaccineApplied: Boolean,
    Aadharcard: Number,
    gender: String,

}, {
    usePushEach: true
});



module.exports = mongoose.model('User', User);