const express = require("express");
const router = express.Router();

const axios = require("axios");

router.post("/SMS", async (req, res) => {
  try {
    console.log("request body "+req.body);
    axios
      .post("https://api.mspace.lk/sms/send", {
        version: "1.0",
        applicationId: "APP_008044",
        password: "APP_008044",
        message: "Hello world",
        destinationAddresses: ["tel:94711923774"],
      })
      .then(function (response) {
        console.log("axios response "+response);
        res.status(200).send(response);
        // res.send(response);
      })
      .catch(function (error) {
        console.log("axios Error "+error);
      })

    
  } catch (error) {
    // res.status(500).json("Error Occored"+error);
  }
});

module.exports = router;
