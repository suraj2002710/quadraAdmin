import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import { Pagination, Typography } from '@mui/material';
import axios from "axios"

import Spinner from 'react-bootstrap/Spinner';
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import { baseurl } from '../../Baseurl';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
const AdminNotification = () => {

    const history = createBrowserHistory()
    const cookie = new Cookies()
    const location=useLocation()
    const querypage=new URLSearchParams(location.search)
    const token = cookie.get('token')
    const [id,setid]=useState("")
  
    const [page, setpage] = useState(querypage.get('page')?parseInt(querypage.get('page')):1)
    const [counts, setcounts] = useState(0)
 
    const [notificationpayment, setnotificationpayment] = useState([])
    const localClients = JSON.parse(localStorage.getItem("adminLogin"))
    const [open, setOpen] = useState(false);

    const [loading, setloading] = useState(true)
    const [temp, settemp] = useState(true)
   
    const [query,setquery]=useState("")
    const navigate = useNavigate()
    
    
    const getnotificationpayment = async () => {
      console.log(localClients);
      const res = await axios.post(`${baseurl}/admin/notifications/`, {
        ...localClients, page: page, page_size: 10
      });
      console.log(res);
      if (res.data.status === "Success") {
        setloading(false)
        let data = res.data
        setnotificationpayment(data.data.final_data)
        setcounts(Math.ceil(data.data.total_data / 10))
      }
      else {
        console.log("suraj");
        setnotificationpayment([])
        setloading(false)
      }
    }
    const handleClickOpen = (id) => {
      setid(id)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
   
    useEffect(() => {
      if(query===""){
        setpage(querypage.get('page')!==null?parseInt(querypage.get('page')):1)
        getnotificationpayment()
        settemp(true)
      }
    }, [page, query,temp])
  
  
    useEffect(() => {
      if (!token) {
        history.push("/")
        navigate("/")
      }
    }, [])


    const notificationDelete = async (id) => {
      console.log(localClients);
      const res = await axios.put(`${baseurl}/admin/notifications/`, {
        ...localClients,notification_id:id
      });
      console.log(res);
      if (res.data.status === "Success") {
      settemp(false)
      setOpen(false)
      }
    }
  
    const sendpageinquery=(val)=>{
      navigate({
        pathname:'/dashboard/adminnotification',
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
                     Notification
                     
                   </h1>
                 
                   <div className="ms-auto">

                   <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                     <div class="container-fluid">
 
                       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                         <span class="navbar-toggler-icon"></span>
                       </button>
                       <div class="collapse navbar-collapse" id="navbarSupportedContent">
 
                       
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

          
           {!notificationpayment.length? (<>
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
                             Notification
                           </th>
                           <th
                             className="sortin"
                             tabindex="0"
                             rowspan="1"
                             colspan="1"
                           >
                             Date
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
                           notificationpayment.map((curEle, i) => {
                             const { id, body,date,report_id } = curEle
                             // console.log(rating);
                             return (
                               <tr id="tableRow" key={i}>
                                 
                                 <td className="checkbox-select">
                                   {(page - 1) * 10 + i + 1}
                                 </td>
                               
                                 <td className="checkbox-select">
                                 {
                                  body.split(" ").map((word)=>{
                                      return word==='reported'?<Link to={`/dashboard/reports?state=${report_id?report_id:""}`} >
                                    {word}
                                      </Link>:
                                      <>
                                      
                                      {" "}  {word}</>
                                  })
                                  
                                 }
                                 </td>
                                 
                                 <td className="checkbox-select">
                                   {new Date(date).toLocaleDateString()}
                                 </td>
                                 
                                 <td className="akign-center nowrap">
                                   <div style={{ display: "flex" }}>
                                     
                                     <button
                                       style={{ marginLeft: "10px" }}
                                       id={id}
                                      onClick={()=>{
                                        handleClickOpen(id)
                                      }}
                                      
                                     >
                                      <i class="fa-solid fa-trash" id={id}></i>
                                     </button>
                                   </div>
                                 </td>
                               </tr>
                             )
                           })
                         }
                       </table>

                  
                      
                       <Dialog
                          open={open}
                          // TransitionComponent={Transition}
                          keepMounted
                          onClose={handleClose}
                          aria-describedby="alert-dialog-slide-description"
                        >
                          <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                              Are you sure you want to delete this user ?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>cancel</Button>
                            <Button onClick={() => notificationDelete(id)}>ok</Button>
                          </DialogActions>
                        </Dialog>
      
                      
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

export default AdminNotification