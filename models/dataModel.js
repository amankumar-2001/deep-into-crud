const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    typeOfData: {
        type: String,
        require: true
    },
    data: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
})

const dataModel = new mongoose.model('datas', dataSchema)

module.exports = dataModel;