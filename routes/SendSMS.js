const express = require("express");
const router = express.Router();
const { parse, stringify, toJSON, fromJSON } = require("flatted");

const axios = require("axios");

router.post("/SMS", async (req, res) => {
    const phoneNo = req.body.phoneNo;
    const urllink = req.body.URLlink;

    console.log("phone no "+phoneNo);
    console.log("URL link "+urllink);
  try {
    const response = await axios.post("https://api.mspace.lk/sms/send", {
      version: "1.0",
      applicationId: "APP_008048",
      password: "892157f1e36be1cc1f7e75dd474db03c",
      message:`You Sucessfully booked the Train Ticket.You can use this link to get Your QR code.
${urllink}`,
      destinationAddresses: ["tel:"+phoneNo],
    });

    // response.a=response;
    // stringify(response);
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json("Error Occored " + error);
  }
});

router.post("/OTP", async (req, res) => {
  try {
    const phoneNo = req.body.phoneNo;
    console.log(phoneNo);
    const response = await axios.post("https://api.mspace.lk/otp/request", {
      applicationId: "APP_008048",
      password: "892157f1e36be1cc1f7e75dd474db03c",
      subscriberId: "tel:" + phoneNo,
      applicationMetaData: {
        client: "MOBILEAPP",
        device: "Redmi 9T",
        os: "android 12",
        appCode: `https://play.google.com/store/apps/details?id=lk`,
      },
    });

    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json("Error Occored " + error);
  }
});

router.post("/OTPres", async (req, res) => {
  try {
    const refNo = req.body.referenceNo;
    const otpNo = req.body.OTP;
    console.log("ref no " + refNo);
    console.log("otpNo " + otpNo);
    const response = await axios.post("https://api.mspace.lk/otp/verify", {
      applicationId: "APP_008048",
      password: "892157f1e36be1cc1f7e75dd474db03c",
      referenceNo: refNo,
      otp: otpNo,
    });

    // response.a=response;
    // stringify(response);
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json("Error Occored " + error);
  }
});

router.post("/cashtrans", async (req, res) => {
  try {
    const telNo = req.body.PhoneNo;
    const deductAmount = req.body.DeductAmount;
    const response = await axios.post(
      "https://api.mspace.lk/caas/direct/debit",
      {
        applicationId: "APP_008048",
        password: "892157f1e36be1cc1f7e75dd474db03c",
        externalTrxId: "12345678901234567890123456789012",
        subscriberId: "tel:"+telNo,
        paymentInstrumentName: "Mobile Account",
        amount: deductAmount,
        currency: "LKR",
      }
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json("Error Occored " + error);
  }
});



router.post("/subscription", async (req, res) => {
    try {
      const response = await axios.post(
        "https://api.mspace.lk/subscription/send",
        {
          applicationId: "APP_008048",
          password: "892157f1e36be1cc1f7e75dd474db03c",
          subscriberId: "tel:94711923774",
          action:"1"
        }
      );
      console.log(response.data);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json("Error Occored " + error);
    }
  });





module.exports = router;
