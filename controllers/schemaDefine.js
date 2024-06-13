const express = require("express");
const Project = require("../models/project")
const { ObjectId } = require('mongodb');
const SchemaDefine = require('../models/schema');
const Role = require("../models/role")


const createSchema = async (req, res) => {
    //validators
    const { name, projectId, fields} = req.body;
    if (!projectId || projectId == null || projectId == undefined) {
        return res.status(401).json({ message: "need Project ID" })
    }
    if (!name || name == null || name == undefined) {
        return res.status(401).json({ message: "need name" })
    }



    //finding project
    const project = await Project.findById(projectId);
    //including permissions in project
    if (!project.permissions.includes(`create${name}`)) {
        project.permissions.push(`create${name}`);
    }
    if (!project.permissions.includes(`update${name}`)) {
        project.permissions.push(`update${name}`);
    }
    if (!project.permissions.includes(`delete${name}`)) {
        project.permissions.push(`delete${name}`);
    }
    if (!project.permissions.includes(`read${name}`)) {
        project.permissions.push(`read${name}`);
    }
    if (!project || project == null || project == undefined) {
        return res.status(401).json({ message: "project not found" })
    }

    // creating schema
    let keys = [];
    fields.map((field, index) => {
        keys.push({ keyName: `${field.fieldName}` });
    })

    const newSchema = await SchemaDefine.create({
        name: name,
        fields: fields,
        projectId: projectId,
        keys: keys,
    });
    const schemaId = newSchema._id;
    // updating project
    project.schemas.push(schemaId);
    await project.save();
    return res.status(200).json({ message: "OK" });
}

const deleteSchema = async (req, res) => {
    // validators
    const { projectId, schemaId } = req.body;
    if (!projectId || projectId == null || projectId == undefined) {
        return res.status(401).json({ message: "need Project ID" })
    }
    if (!schemaId || schemaId == null || schemaId == undefined) {
        return res.status(401).json({ message: "Need Schema ID" });
    }

    //finding project
    const project = await Project.findById(projectId);
    if (!project || project == null || project == undefined) {
        return res.status(401).json({ message: "project not found" })
    }

    // deleting schema
    await SchemaDefine.deleteOne({ _id: schemaId });

    // Updating project
    let tempSchemas = [];
    for (let i = 0; i < project.schemas.length; i++) {
        if (!project.schemas[i].equals(new ObjectId(schemaId))) {
            tempSchemas.push(project.schemas[i]);
        }
    }
    project.schemas = tempSchemas;
    await project.save();
    return res.status(200).json({ message: "OK" })
}




const updateSchema = async (req, res) => {
    // validators
    const { schemaId, fields } = req.body;
    //note that name cant be modified
    if (!schemaId || schemaId == null || schemaId == undefined) {
        return res.status(401).json({ message: "Need Schema ID" });
    }

    // finding schema
    const updatedSchema = await SchemaDefine.findById(schemaId);
    if (!updatedSchema || updatedSchema == null || updatedSchema == undefined) {
        return res.status(404).json({ message: "schema not found" })
    }


    // updating name and fields 
    if (!(fields === null) && !(fields === undefined) && (fields)) {
        updatedSchema.fields = fields;
    }
    await updatedSchema.save();
    console.log(updatedSchema);
    res.status(200).json({ message: "OK" });
}

module.exports = {
    createSchema,
    updateSchema,
    deleteSchema
};

// const getAllSchemas = async (req, res) => {
//     const allSchemas = await SchemaDefine.find();
//     res.status(200).json({ message: "OK", schemas: allSchemas });
// }

// const getSchemaById = async (req, res) => {
//     const schema = await SchemaDefine.findById(req.params.id);
//     if (!schema) {
//         return res.status(404).json({ message: "Schema not found" });
//     }
//     res.status(200).json({ message: "OK" });
// }
