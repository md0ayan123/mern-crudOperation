import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("0")
  const [error,setError] = useState("")
  
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!name || !email || !age) {
      alert("All fields are required.");
      return;
    }

  
    const addUser = { name, email, age };


      const response = await fetch("http://localhost:5000", {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      


      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        navigate("/")
        setError(result.error)

        
      }
      if(response.ok){
        setError("added successfully") 
   

        console.log(result);
        setName("");
        setEmail("");
        setAge("");
        navigate("/all")
        
      
    } 
          
    setTimeout(()=>{
     setError("")
    },2000)
  };

  return (
  <div className="container my-2">
    {error && <div className="alert alert-dark">{error}</div>}
    <form onSubmit = {handleSubmit}>
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

export default Create;
