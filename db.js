const mongoose = require("mongoose");

const mongoURL = 'mongodb://localhost:27017/deep-into-crud';
mongoose.connect(mongoURL);

var connection = mongoose.connection;

connection.on('error', () => {
    console.log("Mongo DB connection failed")
}) 

connection.on('connected', () => {
    console.log("Mongo DB Connection Successful")
})

module.exports = mongoose