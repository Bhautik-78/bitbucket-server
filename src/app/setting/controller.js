const axios = require("axios");
const mongoose = require("mongoose");
const Setting = mongoose.model("setting");
require('dotenv').config();

exports.createUser = async (req, res) => {
    try {
        const {userName} = req.body
        const result = await Setting.find({userName : userName})
        if(!result.length){
            const setting = await Setting.create(req.body)
            if(setting._id){
                res.status(200).send({success: true, message: "setting  created successfully."})
            }else {
                res.status(200).send({success: false, message: "something went wrong."})
            }
        }else {
            res.status(200).send({success: false, message: "User Already Exist"})
        }
    } catch (err) {
        res.status(500).send({success: false, message: err.message || "Some error occurred while retrieving login."});
    }
};

exports.fetchUser = async (req, res) => {
    try {
        const result = await Setting.find({})
        res.status(200).send({success: true, data: result})
    }catch (err) {
        res.status(500).send({success: false, message: err.message || "Some error occurred while retrieving login."});
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id.toString()
        const deleteRecord = await Setting.deleteOne({ _id: id })
        res.status(200).send(deleteRecord)
    } catch (err) {
        res.status(422).send({ success: false, message: err.message })
    }
};

exports.editUser = async (req, res) => {
    try {
        const id = req.params.id.toString()
        const deleteRecord = await Setting.updateOne({ _id: id }, req.body)
        res.status(200).send(deleteRecord)
    } catch (err) {
        res.status(422).send({ success: false, message: err.message })
    }
}
