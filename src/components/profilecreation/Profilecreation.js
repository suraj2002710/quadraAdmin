import {useLocation, useNavigate } from 'react-router-dom';
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
const Profilecreation = () => {
  const [profilecreateion, setprofilecreateion] = useState([])
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
  const [showdesc,setshowdesc]=useState("")

  const [addprofilecreation, setaddprofilecreation] = useState("")

  const [profilecreate_name, setprofilecreate_name] = useState("")
  const [editprofilecreate_name, seteditprofilecreate_name] = useState("")
  const [profilecreate_id, setprofilecreate_id] = useState("")
  const [profilecreatecreateloading, setprofilecreatecreateloading] = useState(false)
  const [profilecreateupdateloading, setprofilecreateupdateloading] = useState(false)
  const [editmodalShow,seteditmodalShow]=useState(false)
  const [editprofilecreate_type,seteditprofilecreate_type]=useState("")
  const[addprofilecreation_type, setaddprofilecreation_type]=useState("")
  const [profilePointNameErrdisplay, setprofilePointNameErrdisplay]=useState("none")
  const [profilePointTypeErrdisplay, setprofilePointTypeErrdisplay]=useState("none")

  const [open, setOpen] = useState(false);
  const getprofilecreation = async () => {
    const res = await axios.post(`${baseurl}/admin/static/profile-points/`, {
      ...localClients, page: page, page_size: 10
    });
    console.log(res);
    if (res.data.status === "Success") {
      setloading(false)
      let data = res.data
      setprofilecreateion(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    }
    else {
      console.log("suraj");
      setprofilecreateion([])
      setloading(false)
    }
  }

  const sendpageinquery=(val)=>{
    navigate({
      pathname:'/dashboard/profilecreate',
      search:`?page=${val}`
    })
  }

  useEffect(() => {
    getprofilecreation()
    settemp(true)
  }, [page, temp])



  const profilecreateioncreate = async (e) => {
    e.preventDefault()
  
    if(profilecreate_name===""){
      setprofilePointNameErrdisplay("block")
    }
    if(profilecreate_name.length>299){
      setprofilePointNameErrdisplay("block")
    }
    if(addprofilecreation_type===""){
      setprofilePointTypeErrdisplay("block")
    }
    else if(addprofilecreation_type==="" || profilecreate_name.length>299 || profilecreate_name===""){
      console.log("sfdf");
      return false
    }
    else{
      setprofilecreatecreateloading(true)
      const res = await axios.post(`${baseurl}/admin/static/profile-points/add-update/`, {
        ...localClients, point: profilecreate_name,type:addprofilecreation_type
      });
      console.log(res);
      if (res.data.status === "Success") {
        console.log("suraj");
        setprofilecreatecreateloading(false)
        setaddprofilecreation(null)
        setprofilecreate_name("")
        setaddprofilecreation_type("")
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
      ...localClients, point_id: id
    });
    console.log(res);
    if (res.data.status === "Success") {
      settemp("temp")
      setOpen(false)
    }
  }

  const show = () => setaddmodalShow(true)
  const handleclose = () => {
    setprofilecreate_name("")
    setprofilecreatecreateloading(false)
    setaddprofilecreation_type("")
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




  const profilecreateioningle_fetch = async (id) => {
    const { data } = await axios.put(`${baseurl}/admin/static/profile-points/`, {
      ...localClients, point_id: id
    })
    console.log(data);
    if (data.status === "Success") {
      console.log(data);
      setprofilecreate_id(data.data.id)
      seteditprofilecreate_name(data.data.point)
      seteditprofilecreate_type(data.data.type)
    }
  }

  const profilecreate_edit = async (e) => {
    e.preventDefault()
    console.log(editprofilecreate_name);
    if(editprofilecreate_name===""){
      setprofilePointNameErrdisplay("block")
    }
    if(editprofilecreate_name.length>299){
      setprofilePointNameErrdisplay("block")
    }
    if(editprofilecreate_type===""){
      setprofilePointTypeErrdisplay("block")
    }
    else if(editprofilecreate_name==="" || editprofilecreate_name.length>299 || editprofilecreate_type===""){
      return false
    }
    else{
    setprofilecreateupdateloading(true)
    const { data } = await axios.put(`${baseurl}/admin/static/profile-points/add-update/`, {
      ...localClients, point_id: profilecreate_id, point: editprofilecreate_name,type:editprofilecreate_type
    })
    console.log(data);
    if (data.status === "Success") {
      seteditmodalShow(false)
      setprofilecreateupdateloading(false)
      setprofilecreate_id("")
      setprofilecreate_name("")
      settemp(false)
    }
  }
  }

  return (
    <>
     <div className="content border-bottom mb-2">
            <div className="container-fluid">
              <div className="row">
                <div id="testkar" className="col-12 heading-me-outer d-flex align-items-center">
                  <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                    Points List
                  </h1>
                
                  <div className="ms-auto">

                  <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                    <div class="container-fluid">

                      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                      </button>
                      <div class="collapse navbar-collapse" id="navbarSupportedContent">

                        <form class="d-flex" role="search">
                          {/* <input style={{ width: "250px" }} class="form-control me-2" type="search" placeholder="Search By Name" aria-label="Search" /> */}
                     
                        </form>
                        <button className='extra-add-btn ms-2' onClick={show}>Add Point</button >
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

         
          {!profilecreateion.length? (<>
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
                            Type
                          </th>

                          <th
                            className="sortin"
                            tabindex="0"
                            rowspan="1"
                            colspan="1"
                          >
                            Point
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
                          profilecreateion.map((curEle, i) => {
                            const { id, point,type } = curEle
                            // console.log(rating);

                            return (
                              <tr id="tableRow" key={i}>
                                
                                <td className="checkbox-select">
                                  {(page - 1) * 10 + i + 1}
                                </td>
                              
                                <td className="checkbox-select">
                                {type.slice(0,1).toUpperCase() + type.slice(1,25)}

              
                                </td>
                                <td className="checkbox-select onlythis">
                                
                                {
                                    point ==="" ? <Typography>No point</Typography>:
                                    showdesc=== i+1 ? <span>
                                      {point} <span className='showless' id={i+1} onClick={(e)=>{
                                        setshowdesc("")
                                      }}>show less</span>
                                    </span>      :
                                   <span>
                                   {point.length>50 ? point.slice(0,50)+'.....':point} {point.length<50 ?null :<span className='showless' id={i+1} onClick={(e)=>{
                                     setshowdesc(parseInt(e.target.id))
                                   }}>show</span>}
                                 </span>    }
                                {/* {point.slice(0,30)+"...."} */}
                          
                                </td>
                                <td className="akign-center nowrap">
                                  <div style={{ display: "flex" }}>
                                    <button id={id
                                    }
                                      onClick={(e) => {
                                        setid(e.target.id)
                                        profilecreateioningle_fetch(e.target.id)
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
                                </td>
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
                          <form onSubmit={profilecreateioncreate}>
                          <label id='labelsinmodal'>Name</label>
                          <input id='Footerlinks1' value={profilecreate_name} placeholder="Enter New Point" onChange={(e) => { setprofilecreate_name(e.target.value) 
                          setprofilePointNameErrdisplay("none")
                          }} type="text" />
                            {profilecreate_name.length>299 ? <label htmlFor="" className={profilePointNameErrdisplay}>Less Than 299 Words</label> :
                            <label htmlFor="" className={profilePointNameErrdisplay}>Required</label>}

                            <label id='labelsinmodal'>Type</label>
                            <input id='Footerlinks1' value={addprofilecreation_type} placeholder="Enter Type" onChange={(e) => { setaddprofilecreation_type(e.target.value) 
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
                          
                            <label id='labelsinmodal'>Point</label>
                            <input id='Footerlinks1' type="text" value={editprofilecreate_name} onChange={(e) => {seteditprofilecreate_name(e.target.value)
                              setprofilePointNameErrdisplay("none")  
                          }
                            
                            } placeholder="Enter Point" />
                              {editprofilecreate_name.length>299 ? <label htmlFor="" className={profilePointNameErrdisplay}>Less Than 299 Words</label> :
                            <label htmlFor="" className={profilePointNameErrdisplay}>Required</label>}

                            <label id='labelsinmodal'>Type</label>
                            <input id='Footerlinks1' type="text" value={editprofilecreate_type} onChange={(e) => {seteditprofilecreate_type(e.target.value)
                            setprofilePointTypeErrdisplay("none")
                            }} placeholder="Enter Type" />

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
                            Are you sure you want to delete this Profilecreate ?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={() => profilecreatedelete(id)}>Ok</Button>
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

export default Profilecreation