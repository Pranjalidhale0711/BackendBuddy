const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unqiue: true
    },
    fields: [{
        fieldName: {
            type: String,
            required: true
        },
        dataType: {
            type: String,
            enum: ['String', 'Number', 'Boolean', 'Date', 'Array', 'Object', 'ObjectId', 'Mixed'],
            required: true
        },
        isUnique: {
            type: Boolean,
            default: false
        },
        isRequired: {
            type: Boolean,
            default: false
        },
        content: {
            type: mongoose.Schema.Types.Array
        }
    }],
    keys: [
        {
            keyName: { type: String }
        }
    ]
    ,
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Project"
    },
})

module.exports = mongoose.model('SchemaDefine', schema);