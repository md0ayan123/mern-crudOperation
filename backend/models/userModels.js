const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    
    age:{
        type:Number,
    }
},{timestamps:true})
module.exports=mongoose.model("user",userSchema)