import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { Pagination, Typography } from '@mui/material';
import axios from "axios"

import { Dropdown, Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import { baseurl } from '../../Baseurl';
import { MdOutlineFilterList } from 'react-icons/md';

const User_q = () => {
  const history = createBrowserHistory()
  const cookie = new Cookies()
  const location=useLocation()
  const querypage=new URLSearchParams(location.search)
  const token = cookie.get('token')
  const [editmodalShow, seteditmodalShow] = useState(false)
  const [page, setpage] = useState(querypage.get('page')?parseInt(querypage.get('page')):1)
  const [counts, setcounts] = useState(0)
  const [id, setid] = useState(null)
  const [userquerys, setuserquerys] = useState([])
  const localClients = JSON.parse(localStorage.getItem("adminLogin"))
  const [addmodalShow, setaddmodalShow] = useState(false)
  const [adduserquerys, setadduserquerys] = useState("")
  const [loading, setloading] = useState(true)
  const [temp, settemp] = useState(true)
  const [showdesc,setshowdesc]=useState("")

  const [edituserquery_name, setedituserquery_name] = useState("")
  const [userquery_id, setuserquery_id] = useState("")
  const [userquerycreateloading, setuserquerycreateloading] = useState(false)
  const [userqueryupdateloading, setuserqueryupdateloading] = useState(false)
  const [open, setOpen] = useState(false);
  const [query,setquery]=useState("")
  const [userquerysErrdisplay, setuserquerysErrdisplay] = useState("none")
  const [type, settype] = useState("name")
  const navigate = useNavigate()
  const getuserquerys = async () => {
    const res = await axios.post(`${baseurl}/admin/query_fetch/`, {
      ...localClients, page: page, page_size: 10
    });
    console.log(res);
    if (res.data.status === "Success") {
      setloading(false)
      let data = res.data
      setuserquerys(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    }
    else {
      console.log("suraj");
      setuserquerys([])
      setloading(false)
    }
  }
  const userqueryscreate = async (e) => {
    e.preventDefault()
    if(adduserquerys==="") {
      setuserquerysErrdisplay("block")
    }else{
    setuserquerycreateloading(true)
    const res = await axios.put(`${baseurl}/admin/static/userquerys/`, {
      ...localClients, userquery: adduserquerys
    });
    console.log(res);
    if (res.data.status === "Success") {
      console.log("suraj");
      setuserquerycreateloading(false)
      setadduserquerys(null)
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
  const userquerydelete = async (id) => {
    setloading(true)
    const res = await axios.post(`${baseurl}/admin/del_query_fetch/`, {
      ...localClients, id: id
    });
    console.log(res);
    if (res.data.status === "Success") {
      settemp("temp")
      setOpen(false)
      setloading(false)
    }
  }
  useEffect(() => {
    if(!query){
      getuserquerys()
      settemp(true)
    }
  }, [page, temp])

  const show = () => setaddmodalShow(true)
  const handleclose = () => {
    setadduserquerys(null)
    setuserquerycreateloading(false)
    setaddmodalShow(false);
  }

  const handlecloseEdit = () => {
    setuserqueryupdateloading(false)
    seteditmodalShow(false)
    setuserquery_id("")

  }
  useEffect(() => {
    if (!token) {
      history.push("/")
      navigate("/")
    }
  }, [])

  const sendpageinquery=(val)=>{
    navigate({
      pathname:'/dashboard/userquerys',
      search:`?page=${val}`
    })
  }



  const searchfilter = async (query) => {
    const { data } = await axios.post(`${baseurl}/admin/search_query_fetch/`, {
      ...localClients,filter_by:type,query:query, page: page, page_size: 10
    })
    if (data.status === 'Success') {
      console.log(data);
      setuserquerys(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
      setloading(false)
    } else {
      setuserquerys([])
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
                      User Query
                    </h1>
                  
                    <div className="ms-auto">

                    <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                      <div class="container-fluid">
  
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
  
                          <form class="d-flex" role="search">
                          <input  style={{ width: "250px" }} onChange={(e)=>{
                            setquery(e.target.value)
                            setpage(1)
                              searchfilter(e.target.value)
                              setloading(true)
                            }} class="form-control me-2" type="search" placeholder={`Search By ${type.slice(0, 1).toUpperCase() + type.slice(1, 25)}`} aria-label="Search" />
                         <Dropdown onSelect={(e) => {
                                console.log(e)
                                setquery("")
                                settype(e)
                                setpage(1)
                           
                              }}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic"  >
                                  <MdOutlineFilterList size={30} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                  <Dropdown.Item eventKey="email" >email</Dropdown.Item>
                                  <Dropdown.Item eventKey="name">Name</Dropdown.Item>
                              

                                </Dropdown.Menu>
                              </Dropdown>
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

           
            {!userquerys.length? (<>
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
                           Name
                            </th>
                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                           Email
                            </th>

                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                           Query
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
                            userquerys.map((curEle, i) => {
                              const { id,name, email,query } = curEle
                              // console.log(rating);

                              return (
                                <tr id="tableRow" key={i}>
                                  
                                  <td className="checkbox-select">
                                    {(page - 1) * 10 + i + 1}
                                  </td>
                                
                                  <td className="checkbox-select">
                                    
                                    {/* {name} */}
                                    {
                                  name.split(" ").map((word)=>{
                                      return (
                                      <>
                                      
                                      {" "}  {word.slice(0,1).toUpperCase() + word.slice(1,25)}</>
                                  )})
                                  
                                 }

                                  </td>
                                  <td className="checkbox-select">
                                    
                                    {email}

                                  </td>
                                  <td className="checkbox-select onlythis">
                                    
                                  {
                                    
                                    query ==="" ? <Typography>No Query</Typography>:
                                    showdesc=== i+1 ? <span>
                                      {query} <span className='showless' id={i+1} onClick={(e)=>{
                                        setshowdesc("")
                                      }}>show less</span>
                                    </span>      :
                                   <span>
                                   {query.length>50 ? query.slice(0,50)+'.....':query} {query.length<50 ?null :<span className='showless' id={i+1} onClick={(e)=>{
                                     setshowdesc(parseInt(e.target.id))
                                   }}>show</span>}
                                 </span>    }

                                  </td>
                                  <td className="akign-center nowrap">
                                    <div style={{ display: "flex" }}>
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
                              Add userquerys
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form onSubmit={userqueryscreate}>
                              <input id='Footerlinks1' value={adduserquerys} placeholder="Enter New userquerys" onChange={(e) => { setadduserquerys(e.target.value) 
                              
                              setuserquerysErrdisplay("none")
                              }} type="text" />
                              <label htmlFor="" className={userquerysErrdisplay}>Required</label>
                              <button id='Footerlinks2' type='submit'>{userquerycreateloading ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              /> : "Add"}</button>
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
                              userquerys Details
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form>
                            
                              <input hidden id='Footerlinks1' type="text" value={userquery_id} readOnly />
                              <label id='labelsinmodal'>userquerys</label>
                              <input id='Footerlinks1' type="text" value={edituserquery_name} onChange={(e) => {
                                setedituserquery_name(e.target.value)
                                setuserquerysErrdisplay("none")
                              }
                              } placeholder="Enter Footerlink Name" />
                        
                           
                              <label htmlFor="" className={userquerysErrdisplay}>Required</label>
                              <button id='Footerlinks2' type="submit">{userqueryupdateloading ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              /> : "Update"}</button>
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
                              Are you sure you want to delete this userquery ?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>cancel</Button>
                            <Button onClick={() => userquerydelete(id)}>ok</Button>
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

export default User_q