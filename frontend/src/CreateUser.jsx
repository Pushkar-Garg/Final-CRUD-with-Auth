import axios from 'axios';
import React ,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [values,setValues]= useState({
    name: "",
    email: "",
    mobileNumber: 0,
    date: 0,
})
  const navigate = useNavigate();
   const handleSubmit= (e) =>{
    e.preventDefault();
    axios.post("http://localhost:8081/create", values)
    .then(res =>{
      console.log(res);
      navigate("/user")
    }).catch(err => console.log(err))
   }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
       <div className="w-50 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h2>Add Users</h2>
            <div className="mb-2">
                <label htmlFor="name">Name</label>
                <input  className='form-control' type="text" name="name" id="name"  onChange={(e)=> setValues({...values, name: e.target.value})}/>
            </div>
            <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input className='form-control' type="email" name="email" id="email" onChange={(e)=> setValues({...values, email: e.target.value})} />
            </div>
            <div className="mb-2">
                <label htmlFor="number">Mobile Number</label>
                <input className='form-control' type="number" name="number" id="number" onChange={(e)=> setValues({...values, mobileNumber: e.target.value})}/>
            </div>
            <div className="mb-2">
                <label htmlFor="date">Date of Birth</label>
                <input className='form-control' type="date" name="date" id="date" onChange={(e)=> setValues({...values, date: e.target.value})}/>
            </div>
            <button className='btn btn-success'>Submit</button>
          </form>
       </div>
    </div>
  )
}

export default CreateUser
