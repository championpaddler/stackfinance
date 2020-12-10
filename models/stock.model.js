const mongoose = require('mongoose');

const stock = mongoose.Schema({
    name: String,
    value: Number,
    ticket:String
});

module.exports = mongoose.model('Stock', stock);