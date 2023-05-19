import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import { Pagination, Typography } from '@mui/material';
import axios from "axios"

import Spinner from 'react-bootstrap/Spinner';
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import { baseurl } from '../../Baseurl';
const MilstonPayment = () => {

    const history = createBrowserHistory()
    const cookie = new Cookies()
    const location=useLocation()
    const navigate = useNavigate()
    const querypage=new URLSearchParams(location.search)
    const token = cookie.get('token')
    
    const [page, setpage] = useState(querypage.get('page')?parseInt(querypage.get('page')):1)
    const [counts, setcounts] = useState(0)
 
    const [milsestone, setmilsestone] = useState([])
    const localClients = JSON.parse(localStorage.getItem("adminLogin"))
   
    const [loading, setloading] = useState(true)
    const [temp, settemp] = useState(true)
   
    const [query,setquery]=useState("")
    
    const navigation =(id)=>{
        navigate("/dashboard/milestones/payments",{state:id})
    }

  
  
    useEffect(() => {
      if (!token) {
        history.push("/")
        navigate("/")
      }
    }, [])
  
    const sendpageinquery=(val)=>{
      navigate({
        pathname:'/dashboard/milsestoneProfessional',
        search:`?page=${val}`
      })
    }
  
      useEffect(() => {
        // milestonedetail_fetch()
      }, [page])
      
  return (
    <>
    <div className="content border-bottom mb-2">
             <div className="container-fluid">
               <div className="row">
                 <div id="testkar" className="col-12 heading-me-outer d-flex align-items-center">
                   <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                     All Projects
                     
                   </h1>
                 
                   <div className="ms-auto">

                   <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                     <div class="container-fluid">
 
                       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                         <span class="navbar-toggler-icon"></span>
                       </button>
                       <div class="collapse navbar-collapse" id="navbarSupportedContent">
 
                         <form class="d-flex" role="search">
                         <input style={{ width: "250px" }} onChange={(e)=>{
                           }} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                      
                         </form>
                         {/* <button className='extra-add-btn ms-2' onClick={show}>Add buysellpayment</button > */}
                       </div>
                     </div>
                   </nav>
                 </div>
        
                 </div>
               </div>
             </div>
           </div>
     {loading ?

       <div style={{
         display: "flex",
         justifyContent: "center", marginTop: "24%"
       }}>

         <Spinner animation="border" />

       </div> : (
         <>

          
           {!milsestone.length? (<>
             <Typography id='nodatafound'>No Data Found</Typography>
             </>):
           <div className="content">
             <div className="container-fluid">
               <div className="row">
                 <div className="col-12">
                   <div className="table-chat">
                     <div className="table-chat-body table-responsive p-0">
                       <table id="result_list" className="table table-quadra">
                         <tr>
                           
                           <th
                             className="sorting_asc"
                             tabindex="0"
                             rowspan="1"
                             colspan="1"

                           >
                             S No.
                           </th>
                           <th
                             className="sortin"
                             tabindex="0"
                             rowspan="1"
                             colspan="1"
                           >
                             Milestone Name
                           </th>
                           <th
                             className="sortin"
                             tabindex="0"
                             rowspan="1"
                             colspan="1"
                           >
                             Milstone File
                           </th>

                           <th
                             className="sortin"
                             tabindex="0"
                             rowspan="1"
                             colspan="1"
                           >
                             Created At
                           </th>

                           <th
                             className="sortin"
                             tabindex="0"
                             rowspan="1"
                             colspan="1"
                           >
                             Milestone Estimate Date
                           </th>

                           <th
                             className="sortin"
                             tabindex="0"
                             rowspan="1"
                             colspan="1"
                           >
                             Paid By Client
                           </th>

                           <th
                             className="sortin"
                             tabindex="0"
                             rowspan="1"
                             colspan="1"
                           >
                             Status
                           </th>


                           <th
                             className="sortin"
                             tabindex="0"
                             rowspan="1"
                             colspan="1"
                           >
                             Action
                           </th>
                         </tr>
                         {
                           milsestone.map((curEle, i) => {
                             const { cost,created_at,milestone_estimated_date,milestone_file,milestone_id,milestone_name,paid_by_client,status} = curEle
                             // console.log(rating);
                             return (
                               <tr id="tableRow" key={i}>
                                 
                                 <td className="checkbox-select">
                                   {(page - 1) * 10 + i + 1}
                                 </td>
                               
                                 <td className="checkbox-select">
                                   {milestone_name}
                                 </td>
                                 <td className="checkbox-select">
                                   {milestone_file}
                                 </td>
                                 <td className="checkbox-select">
                                   
                                   {new Date(created_at).toLocaleDateString()}
                                 </td>
                                 <td className="checkbox-select">
                                   
                                   {milestone_estimated_date}
                                 </td>
                                 <td className="checkbox-select">
                                   {paid_by_client}
                                 </td>

                                 
                                 <td className="checkbox-select">
                                   {status}
                                 </td>
                                 <td className="akign-center nowrap">
                                   <div style={{ display: "flex" }}>
                                     <button id={milestone_id}
                                        onClick={(e) =>{
                                         navigation(e.target.id)
                                        }}
                                     >
                                     <i class="fa-regular fa-pen-to-square" id={milestone_id}></i>
                                     </button>
                                     <button
                                       style={{ marginLeft: "10px" }}
                                       id={milestone_id}
                                       onClick={(e) =>{
                                        navigation(e.target.id)
                                       }}
                                      
                                     >
                                       <i class="fa-solid fa-trash" id={milestone_id}></i>
                                     </button>
                                   </div>
                                 </td>
                               </tr>
                             )
                           })
                         }
                       </table>

           
                      

      
                      
                       {counts > 1 && <Pagination
                         count={counts}
                         page={page}
                         onChange={(e, val) => {
                           console.log(val);
                           sendpageinquery(val)
                           setpage(val)
                         }}
                         id='pagination'
                         color='primary'
                         showLastButton
                         showFirstButton
                         style={{ marginLeft: "300px", marginBottom: "40px" }}
                       />}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
                       }
         </>
       )
     }

   </>
  )
}

export default MilstonPayment