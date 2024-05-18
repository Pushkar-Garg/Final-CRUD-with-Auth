import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

const Register = () => {
    const [values,setValues]= useState({
        name: "",
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post("http://localhost:8081/register" , values)
        .then((res)=> {
            if(res.data.Status === "Success"){
                navigate('/login')
            }
        })
        .catch((err)=> console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-Up</h2>
        <form onSubmit={handleSubmit} >
            <div className="mb-3">
                <label htmlFor="name"><strong>Name</strong></label>
                <input type="text" className="form-control rounded-0" placeholder='Enter name' 
                onChange={(e)=> setValues({...values, name: e.target.value})} name="name" id="name" />
            </div>
            <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" className="form-control rounded-0" placeholder='Enter email'
                onChange={(e)=> setValues({...values, email: e.target.value})} name="email" id="email" />
            </div>
            <div className="mb-3">
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" className="form-control rounded-0" placeholder='Enter password'
                onChange={(e)=> setValues({...values, password: e.target.value})} name="password" id="password" />
            </div>
            <button type="submit" className='btn btn-success w-100 rounded-0'>Sign up</button>
            <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
        </form>
      </div>
      
    </div>
  )
}

export default Register
