const express = require("express");
const router = express.Router();

const axios = require("axios");

router.post("/SMS", async (req, res) => {
  try {
    axios
      .post("https://api.mspace.lk/sms/send", {
        version: "1.0",
        applicationId: "APP_008044",
        password: "ezyrail_123",
        message: "Hello world",
        destinationAddresses: ["tel:94711923774"],
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("finished SuccessFully");
        // always executed
      });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
