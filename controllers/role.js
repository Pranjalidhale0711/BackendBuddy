const express = require("express");
const Role = require("../models/role")
const Project = require("../models/project")
const { ObjectId } = require('mongodb');
const newRole = async (req, res) => {
    //validators
    const { name, projectId, permissions,isRestricted } = req.body;
    if (!projectId || projectId == null || projectId == undefined) {
        return res.status(401).json({ message: "need Project ID" })
    }
    if (!name || name == null || name == undefined) {
        return res.status(401).json({ message: "need name" })
    }

    //finding project
    const project = await Project.findById(projectId);
    if (!project || project == null || project == undefined) {
        return res.status(401).json({ message: "project not found" })
    }

    //creating role
    const newRole = await Role.create({ name: name, projectId: projectId, permissions: permissions, isRestricted:isRestricted })
    const roleId = newRole._id;
    //updating project
    if(isRestricted){
        project.restrictedRoles.push(name);
    }
    project.roles.push(roleId);
    await project.save();
    return res.status(200).json({ message: "OK" })

}

const deleteRole = async (req, res) => {
    //validators
    const {projectId, role } = req.body;
    console.log("project id for deleete is", projectId,role);
    if (!projectId || projectId == null || projectId == undefined) {
        return res.status(401).json({ message: "need Project ID" })
    }
    if(!role || role==null || role==undefined){
        return res.status(401).json({ message: "need role id" })

    }

    //finding project
    const project = await Project.findById(projectId);
    if (!project || project == null || project == undefined) {
        return res.status(401).json({ message: "project not found" })
    }

    //deleting role
    await Role.deleteOne({_id:role});

    //updating project
    let tempRoles = [];
    for(let i = 0; i<project.roles.length; i++){
        if(!project.roles[i].equals(new ObjectId(role))){
            tempRoles.push(project.roles[i]);
        }
    }
    project.roles=tempRoles;
    await project.save();
    return res.status(200).json({ message: "OK" })

}

const updateRole = async(req,res) =>{
    //validators
    const {role,permissions,name}=req.body;
    if(!role || role==null || role==undefined){
        return res.status(401).json({ message: "role id required" })
    }
    const tempRole = await Role.findById(role);
    if(tempRole==null || tempRole == undefined || !tempRole){
        return res.status(500).json({ message: "role not found" })
    }

    //updating name and permissions
    if(!(permissions===null) && !(permissions===undefined) && (permissions)){
        tempRole.permissions=permissions;
    }
    if((name) && !(name==null) && !(name==undefined) && (permissions)){
        tempRole.name=name;
    }
    await tempRole.save();
    return res.status(200).json({ message: "OK" })

}


module.exports = {
    newRole,
    deleteRole,
    updateRole
}