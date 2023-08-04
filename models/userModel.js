const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
}, {
    timestamps: true,
});

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, "mynameisamankumarprajapatiIamadeveloper");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        
        return token;
    } catch (error) {
        res.send("errror");
    }
}

const userModel = new mongoose.model('users', userSchema)

module.exports = userModel;