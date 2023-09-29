const router=require("express").Router();
const bcrypt=require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const User=require("../Modules/user");


const crypto = require('crypto');

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex'); // 32 bytes (256 bits)
};

const SECRET_KEY = generateSecretKey();
console.log(SECRET_KEY);


const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

//Register
router.post("/register",async(req,res)=>{
     try {

        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(req.body.password,salt);
        const newUser=new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            NIC:req.body.NIC,
            PhoneNo:req.body.PhoneNo,
            username:req.body.username,
            password:hashpassword,
        })

        const user=await newUser.save();
        res.status(200).json(user);
        
     } catch (error) {
        console.log("user Adding Error "+error);
        res.status(500).json(error);
     }
})


//LOGIN

router.post("/login",async(req,res)=>{
    try {
        const { username } = req.body;
        const user= await User.findOne({
            username:req.body.username
        })
        if (user!=null) {
            const validated =await bcrypt.compare(req.body.password,user.password);
            console.log("validated value ",validated);
            if (!validated) {
                !validated && res.status(400).json("wrong credentials");
            }else{
                const { password, ...others } = user._doc;
                // res.status(200).json(others);
                const token = jwt.sign({ username }, SECRET_KEY);
                const userID=user._id;
                const userphone=user.PhoneNo;
                console.log("token"+token+"  id"+userID+"   phoneno"+userphone);
                res.json({ token,userID,userphone });
            }
        }else{
            !user && res.status(400).json("wrong credentials");
        }
        
        console.log(user);
       

        
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports=router;