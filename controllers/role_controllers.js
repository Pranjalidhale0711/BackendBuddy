const express = require("express");
const Role = require("../models/role_model");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const addRole = async (req, res) => {
  const { name, projectId, permissions, isRestricted } = req.body;
  if (!projectId || projectId == null || projectId == undefined) {
    return res.status(401).json({ message: "need Project ID" });
  }
  if (!name || name == null || name == undefined) {
    return res.status(401).json({ message: "need name" });
  }
  const token = req.headers["authorization"];
  try {
    console.log("here");
    const newRole = await Role.create({
      name: name,
      projectId: projectId,
      permissions: permissions,
      isRestricted: isRestricted,
    });
    try {
        // console.log(newRole);
      await axios.post(
        `${process.env.PROJ_SERVICE_URL}/addRole`,
        {
          roleId: newRole._id,
          isRestricted: isRestricted,
          name: name,
          projectId: projectId,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
    } catch (e) {
      return res.status(500).json({ message: "There was error" });
    }
    await newRole.save();
    return res.status(200).json({ message: "Role created Succesfully!" });
  } catch (e) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

const deleteRole = async (req, res) => {
    const { name,roleId,projectId } = req.body;
    if (!roleId || roleId == null || roleId == undefined || projectId==null) {
        return res.status(401).json({ message: "need Project ID" });
    }
    if (!name || name == null || name == undefined) {
        return res.status(401).json({ message: "need name" });
    }
    const token = req.headers["authorization"];
    try {
        console.log("here");
      const newRole = await Role.findByIdAndDelete(roleId);
      try {
          console.log(newRole);
        await axios.post(
          `${process.env.PROJ_SERVICE_URL}/deleteRole`,
          {
            roleId: roleId,
            name: name,
            projectId: projectId,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
      } catch (e) {
        return res.status(500).json({ message: "There was error" });
      }
     
      return res.status(200).json({ message: "Role deleted" });
    } catch (e) {
      return res.status(500).json({ message: "Internal Error" });
    }
  };

const updateRole=async(req,res)=>{
    const {name,permissions,roleId}=req.body;
    try{
        const getRole=await Role.findById(roleId);
        console.log(getRole);
        if(roleId==null || roleId==undefined)
        {
            return res.status(500).json({message:"No such Role exists"});
        }
        if(getRole==null||getRole==undefined)
        {
            return res.status(500).json({message:"No such Role exists"});
        }
        if (!(permissions === null) && !(permissions === undefined) && (permissions)) {
            getRole.permissions = permissions;
        }
        if ((name) && !(name == null) && !(name == undefined) && (permissions)) {
            getRole.name = name;
        }
        await getRole.save();
        return res.status(200).json({message:"Role updated Successfully"});
    }catch(e)
    {
        return res.status(500).json({message:"There is error"});
    }
   

}

const getRole=async(req,res)=>{
  const {roleIds}=req.body;
  console.log(roleIds);
  const allRolesDetails=[];
  try{
    await Promise.all(
      roleIds?.map(async (role) => {
          const roleInfo = await Role.findById(role);
          if (roleInfo != undefined && roleInfo != null && roleInfo) {
              allRolesDetails.push(roleInfo);
          }
      })
  )
    console.log(allRolesDetails)
    return res.status(200).json({message:"Roles Fetched Successfully",roleDetails:allRolesDetails})
  }catch(e)
  {
    return res.status(500).json({message:"Internal Error"})
  }
}






module.exports = {
  addRole,
  deleteRole,
  updateRole,
  getRole
};
