import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import { Pagination, Typography } from '@mui/material';
import axios from "axios"

import Spinner from 'react-bootstrap/Spinner';
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import { baseurl } from '../../Baseurl';


const ProjectReject = () => {
  const [showdesc,setshowdesc]=useState("")

    const history = createBrowserHistory()
    const cookie = new Cookies()
    const location=useLocation()
    const querypage=new URLSearchParams(location.search)
    const token = cookie.get('token')
    
    const [page, setpage] = useState(querypage.get('page')?parseInt(querypage.get('page')):1)
    const [counts, setcounts] = useState(0)
 
    const [projectreject, setprojectreject] = useState([])
    const localClients = JSON.parse(localStorage.getItem("adminLogin"))
   
    const [loading, setloading] = useState(true)
    const [temp, settemp] = useState(true)
   
    const navigate = useNavigate()
    
    
    const getprojectreject = async () => {
      console.log(localClients);
      setloading(true)
      const res = await axios.post(`${baseurl}/admin/project_reject_reasons/`, {
        ...localClients, page: page, page_size: 10
      });
      console.log(res);
      if (res.data.status === "Success") {  
        setloading(false)
        let data = res.data
        setprojectreject(data.data.final_data)
        setcounts(Math.ceil(data.data.total_data / 10))
      }
      else {
        console.log("suraj");
        setprojectreject([])
        setloading(false)
      }
    }
   
   
    useEffect(() => {
  
        getprojectreject()
        settemp(true)
    
    }, [page, temp])
  
  
    useEffect(() => {
      if (!token) {
        history.push("/")
        navigate("/")
      }
    }, [])
  
    const sendpageinquery=(val)=>{
      navigate({
        pathname:'/dashboard/projectrejectProfessional',
        search:`?page=${val}`
      })
    }

  return (
    <>
    <div className="content border-bottom mb-2">
             <div className="container-fluid">
               <div className="row">
                 <div id="testkar" className="col-12 heading-me-outer d-flex align-items-center">
                   <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                     Rejected Projects
                     
                   </h1>
                 
                   <div className="ms-auto">

                   <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                     <div class="container-fluid">
 
                       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                         <span class="navbar-toggler-icon"></span>
                       </button>
                       <div class="collapse navbar-collapse" id="navbarSupportedContent">
 
                         {/* <form class="d-flex" role="search">
                         <input style={{ width: "250px" }} onChange={(e)=>{
                           }} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        
                         </form> */}
                         {/* <button className='extra-add-btn ms-2' onClick={show}>Add projectreject</button > */}
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

          
           {!projectreject.length? (<>
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
                            Project Name
                           </th>
                           
                         

                       
                           <th
                             className="sortin"
                             tabindex="0"
                             rowspan="1"
                             colspan="1"
                           >
                           Reason
                           </th>
                           <th
                             className="sortin"
                             tabindex="0"
                             rowspan="1"
                             colspan="1"
                           >
                            Date
                           </th>

                           
                   
                           {/* <th
                             className="sortin"
                             tabindex="0"
                             rowspan="1"
                             colspan="1"
                           >
                             Action
                           </th> */}
                         </tr>
                         {
                           projectreject.map((curEle, i) => {
                             const { id,date,milestone_id,milestone_name,project_id,project_name,reason } = curEle
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
                          {project_name}

                                 </td>
                                 <td className="checkbox-select">
                                 {
                                    reason ==="" ? <Typography>No reason</Typography>:
                                    showdesc=== i+1 ? <span>
                                      {reason} <span className='showless' id={i+1} onClick={(e)=>{
                                        setshowdesc("")
                                      }}>show less</span>
                                    </span>      :
                                   <span>
                                   {reason.length>50 ? reason.slice(0,50)+'.....':reason} {reason.length<50 ?null :<span className='showless' id={i+1} onClick={(e)=>{
                                     setshowdesc(parseInt(e.target.id))
                                   }}>show</span>}
                                 </span>    }
                                 </td>
                               
                                
                                 <td className="checkbox-select">
                                   
                                   {new Date(date).toLocaleDateString()}
                                 </td>
                                
                                 {/* <td className="akign-center nowrap">
                                   
                                   <div style={{ display: "flex" }}>
                                     
                                     <button
                                       style={{ marginLeft: "10px" }}
                                       id={id}
                                       
                                     >
                                       <i class="fa-sharp fa-solid fa-circle-info"  id={id}></i>
                                     </button>
                                   </div>
                                 </td> */}
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

export default ProjectReject