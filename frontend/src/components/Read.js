import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Read = () => {
  const [data, setDate] = useState([])
  const [error ,setError] =useState('')

  async function getDate() {

    const response = await fetch("http://localhost:5000/getall");
    const result = await response.json()

    if (!response.ok) {
      console.log(result.error);
      setError(result.error)
      return;
    }
    if (response.ok){
      setDate(result)
      
    }
  }

  const handleDelete=async(id)=>{
     
    const response =await fetch(`http://localhost:5000/${id}`,{
      method:"DELETE"
    })
    const result =await response.json()
 

    if(!response.ok){
        setError(result.error)
      }
      if(response.ok){
        setError("deleted successfully")
      }

      setTimeout  (()=>{
        setError("")
        getDate()
      },1000)

  }

    useEffect(() => {
      getDate()
    }, [])
    console.log(data);


  return (
    <div className='container my-2 '>
   {error && <div className="alert alert-danger">{error}</div>}
      <h1 className='text-center'>All data</h1>
      <div className='row'>
        {data?.map((index)=>{
          return <div key={index._id} className='col-3 mt-4'>
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{index.name}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">{index.email}</h6>
              <p className="card-text">{index.age}</p>
              <a href="#" className="card-link" onClick={()=>handleDelete(index._id)}>Detete </a>
              <Link to={`/${index._id}`} className="card-link">Edit </Link>
            </div>
          </div>
        </div>
        
         })} 
        
      </div>
    </div>
  )
}

export default Read
