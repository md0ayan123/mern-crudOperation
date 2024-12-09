const mongoose =require("mongoose")

mongoose.connect(`mongodb://127.0.0.1:27017/merndb`)
.then(function(){
  console.log("mongoose connected successfully");
  
})
.catch(function(err){
console.log(err);
})
module.exports=mongoose.connection