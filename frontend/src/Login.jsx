import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

const Login = () => {
    const [values,setValues]= useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post("http://localhost:8081/login" , values)
        .then((res)=> {
            if(res.data.Status === "Success"){
                navigate('/user')
            }else{
                alert(res.data.Error)
            }
        })
        .then((err)=> console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    <div className="bg-white p-3 rounded w-25">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="email"><strong>Email</strong></label>
              <input type="email" className="form-control rounded-0"
              onChange={(e)=> setValues({...values, email: e.target.value})} placeholder='Enter email' name="email" id="email" />
          </div>
          <div className="mb-3">
              <label htmlFor="password"><strong>Password</strong></label>
              <input type="password" className="form-control rounded-0"
              onChange={(e)=> setValues({...values, password: e.target.value})} placeholder='Enter password' name="password" id="password" />
          </div>
          <button type="submit" className='btn btn-success w-100 rounded-0'>Login</button>
          <Link to="/register" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
      </form>
    </div>
    
  </div>
  )
}

export default Login
