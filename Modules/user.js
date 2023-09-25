const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        unique:true
    },
    lastName:{
        type:String,
        required:true,
        unique:true
    },
    NIC:{
        type:String,
        required:true,
        unique:true
    },
    PhoneNo:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
    
},{timestamps:true});


module.exports=mongoose.model("UserEzyRail",UserSchema);
