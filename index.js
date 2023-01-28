const express=require('express');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors());

require('dotenv').config();

const Mongoose = require('mongoose');
Mongoose.connect(process.env.MONGO_URL);
const schema=Mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
         default:null
    },

});
const newschema=Mongoose.model('contact',schema);;
app.post('/contact',async(req,resp)=>{
   
    const data=new newschema({
    name:req.body.name,
    email:req.body.email,
    message:req.body.message
    });
    let result=await data.save();
    if(result){
    resp.send(result);}
    else{
        resp.send({result:false});
    }
    });


    var PORT = process.env.PORT;
 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})
    