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
const Customer = () => {
    const [stripe_account, setstripe_account] = useState([])
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

    const [editclientName, seteditclientName] = useState("")
    const [stripe_account_id, setstripe_account_id] = useState("")
    const [stripe_accountupdateloading, setstripe_accountupdateloading] = useState(false)
    const [editmodalShow,seteditmodalShow]=useState(false)
    const [editcustomerId,seteditcustomerId]=useState("")
    const [open, setOpen] = useState(false);
    const [query,setquery]=useState("")
    const [cardid,setcardid]=useState("")
    const [card_token,setcard_token]=useState("")
    const getstripeaccount = async () => {
      const res = await axios.post(`${baseurl}/admin/stripe_customers_list_fetch/`, {
        ...localClients, page: page, page_size: 10
      });
      console.log(res);
      if (res.data.status === "Success") {
        setloading(false)
        let data = res.data
        setstripe_account(data.data.final_data)
        setcounts(Math.ceil(data.data.total_data / 10))
      }
      else {
        console.log("suraj");
        setstripe_account([])
        setloading(false)
      }
    }
  
    const sendpageinquery=(val)=>{
      navigate({
        pathname:'/dashboard/customer',
        search:`?page=${val}`
      })
    }
  
    useEffect(() => {
      if(query===""){
        console.log(querypage.get("page"));
        setpage(querypage.get('page')!==null?parseInt(querypage.get('page')):1)
        getstripeaccount()
        settemp(true)
      }
    }, [page,query,temp])
  
  
  
    const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

    const stripe_accountdelete = async (id) => {
  
      const res = await axios.post(`${baseurl}/admin/delete_stripe_customer/`, {
        ...localClients, client_id:id
      });
      console.log(res);
      if (res.data.status === "Success") {
        settemp("temp")
        setOpen(false)
      }
    }
  
   
  
    const handlecloseEdit = () => {
      setstripe_accountupdateloading(false)
      seteditmodalShow(false)
      setstripe_account_id("")
      seteditclientName("")
    }
    useEffect(() => {
      if (!token) {
        history.push("/")
        navigate("/")
      }
    }, [])

    const stripe_accountingle_fetch = async (id) => {
      const { data } = await axios.post(`${baseurl}/admin/stripe_customers_single_fetch/`, {
        ...localClients, client_id: id
      })
      console.log(data);
      if (data.status === "Success") {
        console.log(data);
        setstripe_account_id(data.data[0].client_id)
        seteditclientName(data.data[0].client_name.slice(0,1).toUpperCase()+data.data[0].client_name.slice(1,25))
        seteditcustomerId(data.data[0].customer_id)
        setcardid(data.data[0].card_id)
        setcard_token(data.data[0].card_token)
    }
    }

    const stripe_account_edit = async (e) => {
      e.preventDefault()
      setstripe_accountupdateloading(true)
      const { data } = await axios.post(`${baseurl}/admin/update_stripe_customer/`, {
        ...localClients, client_id: stripe_account_id, customer_id:editcustomerId,card_id:cardid,card_token:card_token
      })
      console.log(data);
      if (data.status === "Success") {
        seteditmodalShow(false)
        setstripe_accountupdateloading(false)
        setstripe_account_id("")
      
        settemp(false)
      }
    }
  

    const searchfilter = async (query) => {
      setloading(true)
      const { data } = await axios.post(`${baseurl}/admin/search_stripe_customers/`, {
        ...localClients, purpose: "search", query: query, page: page, page_size: 10
      })
      if (data.status === 'Success') {
        console.log(data);
        setstripe_account(data.data.final_data)
        setcounts(Math.ceil(data.data.total_data / 10))
        setloading(false)
      } else {
        setstripe_account([])
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
                 Stripe Account
                 </h1>
               
                 <div className="ms-auto">

                 <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                   <div class="container-fluid">

                     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                       <span class="navbar-toggler-icon"></span>
                     </button>
                     <div class="collapse navbar-collapse" id="navbarSupportedContent">

                       <form class="d-flex" role="search">
                       <input style={{ width: "250px" }} class="form-control me-2" type="search" onChange={(e) => {
                          if(e.target.value){
                            searchfilter(e.target.value)
                          }
                         setquery(e.target.value)
                         setpage(1)
                        
                       }} placeholder="Search By Name" aria-label="Search" />
                    
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

        
         {!stripe_account.length? (<>
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
                           Client Name
                         </th>
             
                         <th
                           className="sortin"
                           tabindex="0"
                           rowspan="1"
                           colspan="1"
                         >
                           Customer id
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
                         stripe_account.map((curEle, i) => {
                           const { id, card_id,card_token,client_id,client_name,customer_id } = curEle
                           // console.log(rating);

                           return (
                             <tr id="tableRow" key={i}>
                               
                               <td className="checkbox-select">
                                 {(page - 1) * 10 + i + 1}
                               </td>
                             
                               <td className="checkbox-select">
                               {/* {client_name.slice(0,1).toUpperCase() + client_name.slice(1,25)} */}
                               {
                                  client_name.split(" ").map((word)=>{
                                      return (
                                      <>
                                      
                                      {" "}  {word.slice(0,1).toUpperCase() + word.slice(1,25)}</>
                                  )})
                                  
                                 }  
                               </td>
                               <td className="checkbox-select">
                                 {customer_id}
                               </td>
                               <td className="akign-center nowrap">
                                 <div style={{ display: "flex" }}>
                                   <button id={client_id}
                                     onClick={(e) => {
                                       setid(e.target.id)
                                       stripe_accountingle_fetch(e.target.id)
                                       seteditmodalShow(true)
                                     }}
                                   >
                                   <i class="fa-regular fa-pen-to-square" id={client_id}></i>
                                   </button>
                                   <button
                                     style={{ marginLeft: "10px" }}
                                     id={client_id}
                                     onClick={(e) => {
                                       handleClickOpen()
                                       setid(e.target.id)
                                     }}
                                   >
                                     <i class="fa-solid fa-trash" id={client_id}></i>
                                   </button>
                                 </div>
                               </td>
                             </tr>
                           )
                         })
                       }
                     </table>


                 
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
                          Client stripe_account Details
                         </Modal.Title>
                       </Modal.Header>
                       <Modal.Body>
                         <form onSubmit={stripe_account_edit}>
                         {/* <label id='labelsinmodal'>ID</label>
                           <input id='Footerlinks1' type="text" value={stripe_account_id} disabled /> */}
                           <label id='labelsinmodal'>Professional Name</label>
                           <input disabled id='Footerlinks1' type="text" value={editclientName} onChange={(e) => seteditclientName(e.target.value)} placeholder="Enter Footerlink Name" />

                           <label id='labelsinmodal'>Connect ID</label>
                           <input id='Footerlinks1' type="text" value={editcustomerId} onChange={(e) => seteditcustomerId(e.target.value)} placeholder="Enter Footerlink Name" />

                           <button id='Footerlinks2' type="submit">{stripe_accountupdateloading ? <Spinner
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
                           Are you sure you want to delete this stripe_account ?
                         </DialogContentText>
                       </DialogContent>
                       <DialogActions>
                         <Button onClick={handleClose}>cancel</Button>
                         <Button onClick={() => stripe_accountdelete(id)}>ok</Button>
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

export default Customer