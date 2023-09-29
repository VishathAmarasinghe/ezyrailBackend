const express = require("express");
const router = express.Router();

const QRs=require("../Modules/Qrstore");



router.post("/store",async(req,res)=>{
    try {

       const newQR=new QRs({
        QRURL:req.body.QRURL,
        QRUniqueID:req.body.QRUniqueID,
        QRUserID:req.body.QRUserID,
        BookedDate:req.body.BookedDate,
        Amount:req.body.Amount,
        TicketCount:req.body.TicketCount
       })

       const genQR=await newQR.save();
       res.status(200).json(genQR);
       
    } catch (error) {
       console.log("QR Adding Error "+error);
       res.status(500).json(error);
    }
})


router.get("/find", async(req,res)=>{
    const username=req.params.QRUserID;
    console.log("userName "+username);
    try {
        let posts;
        if (username) {
            posts=await QRs.find({QRUserID:username})
        }else{
            posts= {};
        }
        console.log("post data "+posts);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
})



module.exports = router;


