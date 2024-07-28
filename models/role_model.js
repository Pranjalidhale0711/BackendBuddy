const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    projectId:{
        type:mongoose.Types.ObjectId,
    },
    permissions:[{
        type:String,
    }],
    isRestricted: {
        type: Boolean,
    }
})
module.exports = mongoose.model("Role", schema);