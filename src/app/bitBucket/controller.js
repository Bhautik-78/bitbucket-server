const axios = require("axios");
const mongoose = require("mongoose");
const bitBucket = mongoose.model("bitBucket");
const Setting = mongoose.model("setting");
require('dotenv').config();

exports.fetchData = async (req, res) => {
    try {
        const {userName} = req.body;
        const setting = await Setting.findOne({userName: userName})
        const {accessToken} = setting
        const prevDate = await bitBucket.findOne({ownerId : userName})
        if(prevDate === null){
            if (setting && setting._id) {
                try{
                    const response = await axios.get(`https://bitbucket.org/!api/2.0/repositories/${userName}?access_token=${accessToken}`)
                    if(response && response.data){
                        response.data.ownerId = userName;
                        response.data.displayName = response && response.data && response.data.values && response.data.values[0].owner.display_name;
                        response.data.accountId = response && response.data && response.data.values && response.data.values[0].owner.account_id;

                        const bucket = await bitBucket.create(response.data)
                        if(bucket._id){
                            res.status(200).send({success: true, message: "bitBucket  created successfully."})
                        }else {
                            res.status(200).send({success: false, message: "something went wrong."})
                        }
                    }else {
                        res.status(200).send({success: false, message: "something went wrong"})
                    }
                }catch (err) {
                    res.status(500).send({success: false, message: err.message || "Some error occurred while retrieving login."});
                }
            }else {
                res.status(422).send({ success: false, message: "Does not exist"})
            }
        }else {
            const response = await axios.get(`https://bitbucket.org/!api/2.0/repositories/${userName}?access_token=${accessToken}`)
            if(response.data.size === prevDate.size){
                res.status(200).send({success: true, message: "Current Date Data Already Exist."})
            }else {
                const removeBucket = await bitBucket.remove({ownerId : userName})
                if(removeBucket && removeBucket.ok){
                    if(response && response.data){
                        response.data.ownerId = userName;
                        response.data.displayName = response && response.data && response.data.values && response.data.values[0].owner.display_name;
                        response.data.accountId = response && response.data && response.data.values && response.data.values[0].owner.account_id;

                        const bucket = await bitBucket.create(response.data)
                        if(bucket._id){
                            res.status(200).send({success: true, message: "bitBucket  updated successfully."})
                        }else {
                            res.status(200).send({success: false, message: "something went wrong."})
                        }
                    }else {
                        res.status(200).send({success: false, message: "something went wrong"})
                    }
                }else {
                    res.status(500).send({success: false, message: "Some error occurred while retrieving login."});
                }
            }
        }
    } catch (err) {
        console.log("err",err)
        res.status(500).send({success: false, message: err.message || "Some error occurred while retrieving login."});
    }
};

exports.loadData = async (req, res) => {
    try {
        const {userName} = req.body;
        const prevData = await bitBucket.findOne({ownerId : userName})
        if(prevData && prevData._id){
            const result = prevData && prevData.values && prevData.values.map(item => ({
                userName : prevData.ownerId,
                displayName : prevData.displayName,
                accountId : prevData.accountId,
                image : item.links.avatar.href,
                repoName : item.name,
                fullName : item.full_name,
                link : item.links.clone[0].href
            }))
            if(result && result.length){
                res.status(200).send({success: true, message: "successFully Loaded Data", data: result})
            }else {
                res.status(200).send({success: false, message: "Data Not Found"})
            }
        }else {
            res.status(200).send({success: false, message: "something went wrong."})
        }
    }catch (err) {
        res.status(500).send({success: false, message: err.message || "Some error occurred while retrieving login."});
    }
};
