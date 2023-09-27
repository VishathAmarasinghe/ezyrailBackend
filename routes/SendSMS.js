const express = require("express");
const router = express.Router();
const {parse, stringify, toJSON, fromJSON} = require('flatted');

const axios = require("axios");

router.post("/SMS", async (req, res) => {
  try {
    // console.log("request body "+req.body);
    const response=await axios.post("https://api.mspace.lk/sms/send",{
        "version": "1.0",
        "applicationId": "APP_008048",
        "password": "892157f1e36be1cc1f7e75dd474db03c",
        "message": "Hello world",
        "destinationAddresses": ["tel:94711923774"]
    });

    response.a=response;
    stringify(response);
    // res.status(200).send(response);
    console.log(response);
    // axios
    //   .post("https://api.mspace.lk/sms/send", {
    //     version: "1.0",
    //     applicationId: "APP_008044",
    //     password: "APP_008044",
    //     message: "Hello world",
    //     destinationAddresses: ["tel:94711923774"],
    //   })
    //   .then(function (response) {
    //     // console.log("axios response "+response);
    //     res.status(200).json(response);
    //     // res.send(response);
    //   })
    //   .catch(function (error) {
    //     console.log("axios Error "+error);
    //   })

    
  } catch (error) {
    res.status(500).json("Error Occored "+error);
  }
});

module.exports = router;
