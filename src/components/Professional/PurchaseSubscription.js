import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { Pagination, Typography } from '@mui/material';
import axios from "axios"

import { Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import { baseurl } from '../../Baseurl';

const PurchaseSubscription = () => {
    const [purchasesubscription, setpurchasesubscription] = useState([])
    const history = createBrowserHistory()
    const [counts, setcounts] = useState(0)
    const localClients = JSON.parse(localStorage.getItem("adminLogin"))
    const navigate=useNavigate()
    const [id, setid] = useState(null)
    const cookie = new Cookies()
    const location=useLocation()
    const querypage=new URLSearchParams(location.search)
    const token = cookie.get('token')
    const [loading, setloading] = useState(true)
    const [temp, settemp] = useState(true)
    const [page, setpage] = useState(querypage.get('page')?parseInt(querypage.get('page')):1)
    const [addmodalShow, setaddmodalShow] = useState(false)
    const [addsubscription, setaddsubscription] = useState("")
    const [skills, setskills] = useState([])
    const [query,setquery]=useState("")
    const [profilecreate_name, setprofilecreate_name] = useState("")
    const [editprofilecreate_name, seteditprofilecreate_name] = useState("")
    const [profilecreate_id, setprofilecreate_id] = useState("")
    const [profilecreatecreateloading, setprofilecreatecreateloading] = useState(false)
    const [profilecreateupdateloading, setprofilecreateupdateloading] = useState(false)
    const [editmodalShow,seteditmodalShow]=useState(false)
    const [editprofilecreate_type,seteditprofilecreate_type]=useState("")
    const[addsubscription_type, setaddsubscription_type]=useState("")
    const [profilePointNameErrdisplay, setprofilePointNameErrdisplay]=useState("none")
    const [profilePointTypeErrdisplay, setprofilePointTypeErrdisplay]=useState("none")
  
    const [open, setOpen] = useState(false);
    const getsubscription = async () => {
      const res = await axios.post(`${baseurl}/admin/subscription_plans_of_professional/`, {
        ...localClients, page: page, page_size: 10
      });
  
      if (res.data.status === "Success") {
        setloading(false)
        let data = res.data
        setpurchasesubscription(data.data.final_data)
        setcounts(Math.ceil(data.data.total_data / 10))
      }
      else {
     
        setpurchasesubscription([])
        setloading(false)
      }
    }
  
    const sendpageinquery=(val)=>{
      navigate({
        pathname:'/dashboard/purchasesubscription',
        search:`?page=${val}`
      })
    }
  
    useEffect(() => {
      if(query===""){
        getsubscription()
      }
      settemp(true)
    }, [page, query,temp])
  
  
  
    const purchasesubscriptioncreate = async (e) => {
      e.preventDefault()
    
      if(profilecreate_name===""){
        setprofilePointNameErrdisplay("block")
      }
      if(addsubscription_type===""){
        setprofilePointTypeErrdisplay("block")
      }
      else if(addsubscription_type==="" || profilecreate_name===""){
    
        return false
      }
      else{
        setprofilecreatecreateloading(true)
        const res = await axios.post(`${baseurl}/admin/static/profile-points/add-update/`, {
          ...localClients, point: profilecreate_name,type:addsubscription_type
        });
      
        if (res.data.status === "Success") {
          
          setprofilecreatecreateloading(false)
          setaddsubscription(null)
          settemp(false)  
          setaddmodalShow(false)
        }
      }
    }
    const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
    const profilecreatedelete = async (id) => {
  
      const res = await axios.post(`${baseurl}/admin/static/profile-points/delete/`, {
        ...localClients, point_id:id
      });
     
      if (res.data.status === "Success") {
        settemp("temp")
        setOpen(false)
      }
    }
  
    const show = () => setaddmodalShow(true)
    const handleclose = () => {
      setprofilecreate_name("")
      setprofilecreatecreateloading(false)
      setaddmodalShow(false);
      setprofilePointNameErrdisplay("none")
      setprofilePointTypeErrdisplay("none")
    }
  
    const handlecloseEdit = () => {
      setprofilecreateupdateloading(false)
      seteditmodalShow(false)
      setprofilecreate_id("")
      seteditprofilecreate_type("")
      seteditprofilecreate_name("")
    }
    useEffect(() => {
      if (!token) {
        history.push("/")
        navigate("/")
      }
    }, [])
  
  
  
  
    const purchasesubscriptioningle_fetch = async (id) => {
      const { data } = await axios.put(`${baseurl}/admin/static/profile-points/`, {
        ...localClients, point_id: id
      })
     
      if (data.status === "Success") {
        
        setprofilecreate_id(data.data.id)
        seteditprofilecreate_name(data.data.point)
        seteditprofilecreate_type(data.data.type)
      }
    }
  
    const profilecreate_edit = async (e) => {
      e.preventDefault()
      
      if(editprofilecreate_name===""){
        setprofilePointNameErrdisplay("block")
      }
      if(editprofilecreate_type===""){
        setprofilePointTypeErrdisplay("block")
      }
      else if(editprofilecreate_name==="" || editprofilecreate_type===""){
        return false
      }
      else{
      setprofilecreateupdateloading(true)
      const { data } = await axios.put(`${baseurl}/admin/static/profile-points/add-update/`, {
        ...localClients, point_id: profilecreate_id, point: editprofilecreate_name,type:editprofilecreate_type
      })
      
      if (data.status === "Success") {
        seteditmodalShow(false)
        setprofilecreateupdateloading(false)
        setprofilecreate_id("")
        setprofilecreate_name("")
        settemp(false)
      }
    }
    }
    const searchfilter = async (query) => {
      const { data } = await axios.post(`${baseurl}/admin/search_professional_purchase_plans/`, {
        ...localClients, query: query, page: page, page_size: 10
      })
      if (data.status === 'Success') {
        
        setpurchasesubscription(data.data.final_data)
        setcounts(Math.ceil(data.data.total_data / 10))
        setloading(false)
      } else {
        setpurchasesubscription([])
        setcounts(0)
        setloading(false)
      }
    }
    
  useEffect(() => {
    if(query){
      searchfilter(query)
      settemp(true)
    }
    }, [page,temp])
  return (
    <>
    <div className="content border-bottom mb-2">
           <div className="container-fluid">
             <div className="row">
               <div id="testkar" className="col-12 heading-me-outer d-flex align-items-center">
                 <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                   Subscription
                 </h1>
               
                 <div className="ms-auto">

                 <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                   <div class="container-fluid">

                     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                       <span class="navbar-toggler-icon"></span>
                     </button>
                     <div class="collapse navbar-collapse" id="navbarSupportedContent">

                       <form class="d-flex" role="search">
                         <input style={{ width: "250px" }} class="form-control me-2"
                         onChange={(e)=>{
                          setquery(e.target.value)
                          setpage(1)
                          if(e.target.value){
                            searchfilter(e.target.value)
                            setloading(true)
                          }
                          }}
                         type="search" placeholder="Search By Name" aria-label="Search" />
                    
                       </form>
                   
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

        
         {!purchasesubscription.length? (<>
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
                           Professional Name
                         </th>

                         <th
                           className="sortin"
                           tabindex="0"
                           rowspan="1"
                           colspan="1"
                         >
                           Plan Name
                         </th>

                         <th
                           className="sortin"
                           tabindex="0"
                           rowspan="1"
                           colspan="1"
                         >
                           Plan Type
                         </th>

                         <th
                           className="sortin"
                           tabindex="0"
                           rowspan="1"
                           colspan="1"
                         >
                           Plan Purchase Date
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
                           Invoice
                         </th>

                       
                       </tr>
                       {
                         purchasesubscription.map((curEle, i) => {
                           const { id, invoice,plan_name,plan_purchase_date,plan_status,plan_type,professional_id,professional_name,storage_used,totl_storage } = curEle
                         

                           return (
                             <tr id="tableRow" key={i}>
                               
                               <td className="checkbox-select">
                                 {(page - 1) * 10 + i + 1}
                               </td>
                             
                               <td className="checkbox-select">
                               {/* {professional_name.slice(0,1).toUpperCase() + professional_name.slice(1,25)} */}
                               {
                                  professional_name.split(" ").map((word)=>{
                                      return (
                                      <>
                                      
                                      {" "}  {word.slice(0,1).toUpperCase() + word.slice(1,25)}</>
                                  )})
                                  
                                 }
                               </td>

                               <td className="checkbox-select">
                               {plan_name.slice(0,1).toUpperCase() + plan_name.slice(1,25)}                         
                               </td>

                               <td className="checkbox-select">
                               {plan_type.slice(0,1).toUpperCase() + plan_type.slice(1,25)}                         
                               </td>
                               
                               <td className="checkbox-select">
                               {new Date(plan_purchase_date).toDateString()}                         
                               </td>
                               
                               <td className="checkbox-select">
                               {plan_status.slice(0,1).toUpperCase() + plan_status.slice(1,25)}                         
                               </td>
                               <td className="checkbox-select">           
                          {invoice ? <a href={invoice} download={invoice}>Download</a> : null}
                               </td>
                             
                               
{/* 
                               <td className="akign-center nowrap">
                                 <div style={{ display: "flex" }}>
                                   <button id={id
                                   }
                                     onClick={(e) => {
                                       setid(e.target.id)
                                       purchasesubscriptioningle_fetch(e.target.id)
                                       seteditmodalShow(true)
                                     }}
                                   >
                                   <i class="fa-regular fa-pen-to-square" id={id}></i>
                                   </button>
                                   <button
                                     style={{ marginLeft: "10px" }}
                                     id={id}
                                     onClick={(e) => {
                                       handleClickOpen()
                                       setid(e.target.id)
                                     }}
                                   >
                                     <i class="fa-solid fa-trash" id={id}></i>
                                   </button>
                                 </div>
                               </td> */}
                             </tr>
                           )
                         })
                       }
                     </table>


                     <Modal
                       show={addmodalShow}
                       onHide={handleclose}
                       size="lg"
                       className="rating_detail_modal"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                     >
                       <Modal.Header closeButton>
                         <Modal.Title id="contained-modal-title-vcenter">
                         Add Point 
                         </Modal.Title>
                       </Modal.Header>
                       <Modal.Body>
                         <form onSubmit={purchasesubscriptioncreate}>
                         <label id='labelsinmodal'>Name</label>
                         <input id='Footerlinks1' value={profilecreate_name} placeholder="Enter New point" onChange={(e) => { setprofilecreate_name(e.target.value) 
                         setprofilePointNameErrdisplay("none")
                         }} type="text" />

                           <label htmlFor="" className={profilePointNameErrdisplay}>Required</label>

                           <label id='labelsinmodal'>type</label>
                           <input id='Footerlinks1' value={addsubscription_type} placeholder="Enter New point" onChange={(e) => { setaddsubscription_type(e.target.value) 
                           setprofilePointTypeErrdisplay("none")
                           }} type="text" />
                           <label htmlFor="" className={profilePointTypeErrdisplay}>Required</label>
                           <button id='Footerlinks2' type='submit'>{profilecreatecreateloading ? <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                           /> : "submit"}</button>
                         </form>

                       </Modal.Body>

                     </Modal>

                     {/* update modal*/}
                     <Modal
                       show={editmodalShow}
                   className="rating_detail_modal"

                       onHide={handlecloseEdit}
                       size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                     >
                       <Modal.Header closeButton>
                         <Modal.Title id="contained-modal-title-vcenter">
                           Point Details
                         </Modal.Title>
                       </Modal.Header>
                       <Modal.Body>
                         <form onSubmit={profilecreate_edit}>
                         
                           <label id='labelsinmodal'>point</label>
                           <input id='Footerlinks1' type="text" value={editprofilecreate_name} onChange={(e) => {seteditprofilecreate_name(e.target.value)
                             setprofilePointNameErrdisplay("none")  
                         }
                           
                           } placeholder="Enter Point Name" />

                           <label htmlFor="" className={profilePointNameErrdisplay}>Required</label>

                           <label id='labelsinmodal'>type</label>
                           <input id='Footerlinks1' type="text" value={editprofilecreate_type} onChange={(e) => {seteditprofilecreate_type(e.target.value)
                           setprofilePointTypeErrdisplay("none")
                           }} placeholder="Enter Point type" />

                           <label htmlFor="" className={profilePointTypeErrdisplay}>Required</label>
                           <button id='Footerlinks2' type="submit">{profilecreateupdateloading ? <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                           /> : "submit"}</button>
                         </form>
                       </Modal.Body>

                     </Modal>

                          {/*confirmation for delete */}
                     <Dialog
                       open={open}
                       // TransitionComponent={Transition}
                       keepMounted
                       onClose={handleClose}
                       aria-describedby="alert-dialog-slide-description"
                     >
                       <DialogContent>
                         <DialogContentText id="alert-dialog-slide-description">
                           Are you sure you want to delete this profilecreate ?
                         </DialogContentText>
                       </DialogContent>
                       <DialogActions>
                         <Button onClick={handleClose}>cancel</Button>
                         <Button onClick={() => profilecreatedelete(id)}>ok</Button>
                       </DialogActions>
                     </Dialog>
                     {counts > 1 && <Pagination
                       count={counts}
                       page={page}
                       onChange={(e, val) => {
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

export default PurchaseSubscription