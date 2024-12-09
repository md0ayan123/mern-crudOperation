const express=require('express')
const userModels=require('../models/userModels')
const router =express.Router()  
const mongoose=require('mongoose')

router.post('/', async(req,res)=>{
  
  const{name,email,age}=req.body
  try {
      const userData=await userModels.create({
          name,
          email,
          age
         })
         res.status(201).json(userData)
  } catch (error) {
   res.status(400).json({error:error.message})   
  }
})
router.get('/getall',async(req,res)=>{
  try {
      const showAll=await userModels.find()
      res.status(200).json(showAll)
  } catch (error) {
      console.log(error);
      res.status(500).json({error:error.message})
      
      
  }
 
})
router.get('/:id',async(req,res)=>{
  const{id}=req.params
  try {
      const singleUser=await userModels.findById({_id:id})
      res.status(200).json(singleUser)
  } catch (error) {
      console.log(error);
      res.status(500).json({error:error.message})
      
      
  }
 
})
router.delete('/:id',async(req,res)=>{
  const{id}=req.params
  try {
      const deleteUser=await userModels.findByIdAndDelete({_id:id})
      res.status(200).json(deleteUser)
  } catch (error) {
      console.log(error);
      res.status(500).json({error:error.message})
      
      
  }
 
})
router.patch('/:id',async(req,res)=>{
  const{id}=req.params;
  const{name,email,age}=req.body;
  try {
      const updateUser=await userModels.findByIdAndUpdate(id,{name,email,age},{new:true})
      res.status(200).json(updateUser)
  } catch (error) {
      console.log(error);
      res.status(500).json({error:error.message})
      
      
  }
 
})


module.exports=router;