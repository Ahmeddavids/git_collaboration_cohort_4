const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userFullName: {
        type: String
    },
    userAddress: {
        type: String
    },
    gender: {
        type: String,
        enum: {
            values: ["Male", "Female"],
            message: 'Gender can only either Male or Female.'
        },
        // required: true
    },
    email: {
        type: String,
        unique: true
    },
    passWord: {
        type: String
    }
}, {timestamp: true});


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;