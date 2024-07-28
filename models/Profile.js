const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
    userName:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required:true,
        minlength: 6
    },
    projects:[{
        type : mongoose.Types.ObjectId
    }]
})

module.exports = mongoose.model("Profile", schema);