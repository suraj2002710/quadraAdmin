import React, { useState } from "react";
import { FaBorderAll, FaUserAlt, FaAlignLeft } from "react-icons/fa";
import { FiLogOut} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import {createBrowserHistory} from "history"
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import {BsFillBellFill} from 'react-icons/bs'
import axios from "axios";
import { baseurl } from "./Baseurl";
const Header = () => {
  const [cookie, removecookie]=useCookies(["token"])
  let token=Cookies.get('token')
  const navigate=useNavigate()
  const [admin,setadmin]=useState("")
  const history=createBrowserHistory()
  const logout=()=>{  
    Cookies.remove('token')
    history.push("/admin")
   navigate("/")
}
const localClients = JSON.parse(localStorage.getItem("adminLogin"))

const getadmin = async () => {
  const res = await axios.put(`${baseurl}/admin/admin_fetch_data/`, {
   ...localClients ,user_id:localClients.admin_id
  });
  console.log(res);
  if (res.data.status === "Success") {
    
    let data = res.data
    console.log(data.data.first_name);
    setadmin(data.data.first_name)
    
  }
  else {
    console.log("suraj");
    setadmin([])
 
  }
}


useEffect(() => {
  getadmin()
}, [])


let adminname=JSON.parse(localStorage.getItem('adminName'))
  useEffect(() => {
    if(!token){
      history.push("/")
    navigate('/')
    }
  }, [])
  return (
    <nav className="main-header navbar navbar-expand  navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item ">
          {/* {" "}
          {/* <Link className="nav-link ">
            {" "}
            <FaAlignLeft />
          </Link> */}
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          {/* <Link className="nav-link" to="#">
            {" "}
            Home
          </Link> */}
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          {/* <Link className="nav-link" to="/dashboard/professionals">
            {" "}
            Professionals
          </Link> */}
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          {/* <Link className="nav-link" to="/dashboard/clients">
            {" "}
            Clients
          </Link> */}
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
      <li className="nav-item ">
        
      {" "}

      <Link style={{color:"white"}} title="Notification" to={"/dashboard/adminnotification"}><BsFillBellFill></BsFillBellFill></Link>
    </li>
        <li className="nav-item ">
          {" "}
          <span  className="nav-link">
            {" "}
         {/* {adminname?.name} */}
         {/* {adminname?.name.slice(0,1).toUpperCase() + adminname?.name.slice(1,25)} */}
         {/* {
                                  admin
                                 } */}
                                 {
                                  admin?.split(" ").map((word)=>{
                                      return (
                                      <>
                                      
                                      {" "}  {word.slice(0,1).toUpperCase() + word.slice(1,25)}</>
                                  )})
                                  
                                 }
          </span>
        </li>
        <li className="nav-item ">
          {" "}
          <button style={{border:"none",color:"white",backgroundColor:"#323a40"  }} onClick={logout}>
            <FiLogOut size={20} title="log out"/>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
