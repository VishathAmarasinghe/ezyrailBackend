const express = require('express');
const app = express();
const mongoose=require('mongoose');
var cors = require('cors')
const authenticationRoute=require('./routes/auth');


app.use(cors());
app.use(express.json());

const PORT = 3000;

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running,and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);

mongoose.connect("mongodb+srv://abcuser:abcuser@cluster0.6kstnpx.mongodb.net/?retryWrites=true&w=majority",
    {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    })
    .then(console.log("connected to the database")).catch((err)=>console.log(err));


app.use("/api/auth",authenticationRoute);