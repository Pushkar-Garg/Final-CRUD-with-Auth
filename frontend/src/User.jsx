import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
const User = () => {
  axios.defaults.withCredentials = true;

    const [user,setUser]= useState([])
    useEffect(()=>{
        axios.get("http://localhost:8081/user")
        .then((res)=> setUser(res.data))
        .catch((err)=>console.log(err))
    },[])
    const handleDelete= async(id)=>{
      try{
        await axios.delete("http://localhost:8081/user/"+id);
        window.location.reload();
      }catch(err){
        console.log(err);
      }

    }
    const handleLogout =() =>{
      axios.get("http://localhost:8081/logout")
      .then(res=>{
        location.reload(true)
      }).catch(err => console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className="w-50 bg-white rounded p-3"> 
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
         <Link to="/create" className="btn btn-success">Add +</Link>
         <table className="table">
            <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>MobileNumber</th>
                  <th>DateOfBirth</th>
                  <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
                user.map((data, i)=>(
                    <tr key={i}>
                        <td>{data.Name}</td>
                        <td>{data.Email}</td>
                        <td>{data.MobileNumber}</td>
                        <td>{data.Date.split("T")[0]}</td>
                        <td>
                            <Link to={`update/${data.ID}`} className="btn btn-primary">Update</Link>
                            <button className="btn btn-danger ms-2" onClick={e=> handleDelete(data.ID)}>Delete</button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
         </table>

      </div>

    </div>
  )
}

export default User
