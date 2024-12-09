import React , { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("0")
  const [error,setError] = useState("")
  const {id}=useParams() 
  const navigate=useNavigate()

// get single user data

   async function getSingleUser(){
 
     const response =await fetch(`http://localhost:5000/${id}`)

     const result =await response.json()

     if(!response.ok){
      setError(result.error)
    }
    if(response.ok){
      setError("")
      console.log("updated" , result);
      setName(result.name)
      setAge(result.age)
      setEmail(result.email)
    }



}
     // send updated data to backend

     const handleUpdate = async (e) => {  
      e.preventDefault();
  
    
      const updateUser = { name, email, age };
  
  
        const response = await fetch(`http://localhost:5000/${id}`,{
          method: "PATCH",
          body: JSON.stringify(updateUser),
          headers: {
            "Content-Type": "application/json",
          },
        });
        
  
  
        const result = await response.json();
  
        if (!response.ok) {
          console.log(result.error);  
          setError(result.error)
  
        }
        if(response.ok){
          setError("")
          navigate("/all")
          
        
      } 
            
   
    };



   useEffect(()=>{
     getSingleUser()
   },[])


  return (
    
     <div className="container my-2">
    {error && <div className="alert alert-dark">{error}</div>}
    <h2 className="text-center">Edit the data  </h2>
    <form onSubmit={handleUpdate}>
    <div class=" mt-3 mb-3 mx-5">
      <label htmlFor="exampleInputname" class="form-label">Name</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required/>
      
    </div>
    <div class="mb-3 mx-5">
      <label htmlFor="exampleInputname" class="form-label">Email</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  value={email}
          onChange={(e) => setEmail(e.target.value)}
          required/>
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3 mx-5">
      <label htmlFor="exampleInputPassword1" class="form-label">Age</label>
      <input type="number" class="form-control" id="exampleInputPassword1"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required/>
    </div>
  
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  </div>
    
  )
}

export default Update
