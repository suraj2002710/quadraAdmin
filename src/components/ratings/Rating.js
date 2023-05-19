import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import { Pagination, Typography } from '@mui/material';
import axios from "axios"
import { Modal, Spinner } from 'react-bootstrap';
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Ratings from '@mui/material/Rating';
import { MdOutlineFilterList } from "react-icons/md"
import Dropdown from 'react-bootstrap/Dropdown';

import { baseurl } from '../../Baseurl';
const Rating = () => {
  const history = createBrowserHistory()
  const cookie = new Cookies()
  const location = useLocation()
  const querypage = new URLSearchParams(location.search)
  const [showdesc,setshowdesc]=useState("")
  const token = cookie.get('token')
  const [page, setpage] = useState(querypage.get('page') ? parseInt(querypage.get('page')) : 1)
  const [open, setOpen] = useState(false);
  const [modalShow, setmodalShow] = useState(false)
  const [counts, setcounts] = useState(0)
  const [id, setid] = useState(null)
  const [ratings, setratings] = useState([])
  const localClients = JSON.parse(localStorage.getItem("adminLogin"))
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const [temp, settemp] = useState(true)
  const [editid, seteditid] = useState('')
  const [editrating, seteditratings] = useState(2)
  const [editprofname, seteditprofname] = useState('')
  const [editclient, seteditclient] = useState('')
  const [editreview, seteditreview] = useState('')
  const [editproid, seteditproid] = useState('')
  const [editclientid, seteditclientid] = useState('')
  const [createloading, setcreateloading] = useState(false)
  const [query,setquery]=useState("")
  const [byrating,setbyrating]=useState("")
  const getClients = async () => {
    console.log("Suraj");
    setloading(true)
    const res = await axios.post(`${baseurl}/admin/ratings/`, {
      ...localClients, page: page, page_size: 10
    });
    console.log(res);
    if (res.data.status === "Success") {
      setloading(false)
      let data = res.data
      setratings(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    }
  }
  const singleratingFetch = async (id) => {
    const { data } = await axios.post(`${baseurl}/admin/single_row_fetch_client_rating/`, {
      ...localClients, rating_id: id
    })
    if (data.status === 'Success') {
      console.log(data);
      seteditid(data.data.id)
      seteditratings(data.data.rating)
      seteditreview(data.data.review===""? "No Review":data.data.review)
      seteditclientid(data.data.client_id)
      seteditproid(data.data.professional_id)
      seteditclient(data.data.client_name)
      seteditprofname(data.data.professional_name)
    }
  }

  const deleteRatings = async (id) => {
    const { data } = await axios.post(`${baseurl}/admin/rating/delete/`, {
      ...localClients, rating_id: id
    })
    if (data.status === 'Success') {
      settemp(false)
      setOpen(false)
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendpageinquery = (val) => {
    navigate({
      pathname: '/dashboard/ratings',
      search: `?page=${val}`
    })
  }

  const searchfilter = async (query) => {
    const { data } = await axios.post(`${baseurl}/admin/search_client_rating/`, {
      ...localClients, purpose: "search", query: query, page: page, page_size: 10
    })
    if (data.status === 'Success') {
      console.log(data);
      setratings(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
      setloading(false)
    } else {
      setratings([])
      setcounts(0)
      setloading(false)
    }
  }

  const searchfilterBYrating = async (query) => {
    const { data } = await axios.put(`${baseurl}/admin/search_client_rating/`, {
      ...localClients, purpose: "search", query: query, page: page, page_size: 10
    })
    if (data.status === 'Success') {
      console.log(data);
      setratings(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
      setloading(false)
    } else {
      setratings([])
      setcounts(0)
      setloading(false)
    }
  }

  const updaterating = async (e) => {
    e.preventDefault()
    setcreateloading(true)
    const { data } = await axios.put(`${baseurl}/admin/ratings/`, {
      ...localClients, client_id: editclientid, professional_id: editproid, rating: editrating, rating_id: editid, review: editreview
    })
    if (data.status === 'Success') {
      seteditclient("")
      seteditclientid("")
      seteditprofname("")
      seteditproid("")
      seteditratings("")
      seteditreview("")
      seteditid("")
      setmodalShow(false)
      settemp(false)
      setcreateloading(false)
    }
  }

  useEffect(() => {
    console.log(byrating.length);
    if(!query && !byrating){
      getClients()
      settemp(true)
    }
  }, [page,byrating,temp])

  useEffect(() => {
    if(query){
      searchfilter(query)
      settemp(true)
    }
  }, [page,temp])
  

  useEffect(() => {
    if (!token) {
      history.push("/")
      navigate("/")
    }
  }, [])
  return (
    <>
    <div className="content border-bottom">
            <div className="container-fluid">
              <div className="row">
                <div id="testkar" className="col-12 col-md-auto d-flex flex-grow-1 align-items-center heading-me-outer justify-content-between mt-5 mt-md-0">
                  <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                    Ratings
                  </h1>
                  <div className="">

                    <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                      <div class="container-fluid">

                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">

                          <form class="d-flex" role="search">
                            <input style={{ width: "250px" }} class="form-control me-2" type="search" onChange={(e) => {
                              searchfilter(e.target.value)
                              setpage(1)
                              setquery(e.target.value)
                                setbyrating("")
                                setloading(true)
                            }} placeholder="Search By Client Name" aria-label="Search" />
                            
                            <Dropdown onSelect={(e)=> {console.log(e)
                                  searchfilterBYrating(e)
                                  setpage(1)
                                  setbyrating(e)
                                  setquery("")
                                  setloading(true)
                            }}>
                              <Dropdown.Toggle variant="success" id="dropdown-basic"  >
                                <MdOutlineFilterList size={30} />Rating
                              </Dropdown.Toggle>
                              <Dropdown.Menu >
                              <Dropdown.Item eventKey="" >All</Dropdown.Item>
                                <Dropdown.Item eventKey="1" >1</Dropdown.Item>
                                <Dropdown.Item eventKey="2">2</Dropdown.Item>
                                <Dropdown.Item eventKey="3">3</Dropdown.Item>
                                <Dropdown.Item eventKey="4">4</Dropdown.Item>
                                <Dropdown.Item eventKey="5">5</Dropdown.Item>
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

        </div> :
        <>
          
          {!ratings.length ? (<>
            <Typography id='nodatafound'>No Data Found</Typography>
          </>) :
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
                              Client Name
                            </th>
                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Rating
                            </th>
                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Review
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
                            ratings.map((curEle, i) => {
                              const { client_id, id, rating, professional_id, professional_name, client_name, review } = curEle
                              // console.log(rating);
                              if (professional_id !== professional_id) {
                                console.log(professional_name);
                              }
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

                                    {!rating ? <Typography>No Ratings</Typography> :
                                      <Ratings name="read-only" value={rating} readOnly />}

                                  </td>
                                  <td className="checkbox-select onlythis">

                                  {
                                    
                                        review ==="" ? <Typography>No Review</Typography>:
                                        showdesc=== i+1 ? <span>
                                          {review} <span className='showless' id={i+1} onClick={(e)=>{
                                            setshowdesc("")
                                          }}>show less</span>
                                        </span>      :
                                       <span>
                                       {review.length>50 ? review.slice(0,50)+'.....':review} {review.length<50 ?null :<span className='showless' id={i+1} onClick={(e)=>{
                                         setshowdesc(parseInt(e.target.id))
                                       }}>show</span>}
                                     </span>    }
 
                                    
                                  </td>
                                  <td className="akign-center nowrap">


                                    <div style={{ display: "flex" }}>
                                      <button id={id
                                      }
                                        onClick={(e) => {
                                          singleratingFetch(e.target.id)

                                          setmodalShow(true)
                                        }}
                                      >
                                        <i class="fa-regular fa-pen-to-square" id={id}></i>
                                      </button>
                                      <button
                                        style={{ marginLeft: "10px" }}
                                        id={id}
                                        onClick={(e) => {
                                          console.log(e.target.id);
                                          setid(e.target.id)
                                          handleClickOpen()
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
                        {/*delete confirmation */}

                        <Modal
                          show={modalShow}
                          className="rating_detail_modal"
                          onHide={() => {
                            seteditid("")
                            seteditratings("")
                            seteditreview("")
                            seteditclientid("")
                            seteditproid("")
                            seteditclient("")
                            seteditprofname("")
                            setmodalShow(false)
                            setcreateloading(false)
                          }}
                          size="lg"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                              Rating Details
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form onSubmit={updaterating}>
                              <label id='labelsinmodal'>	Professional Name </label>
                              <input id='Footerlinks1' type={'text'} disabled
                                onChange={(event) => {
                                  seteditprofname(event.target.value);
                                }}
                                value={editprofname} />
                              <label id='labelsinmodal'>Client Name</label>
                              <input type={'text'} id='Footerlinks1' disabled
                                onChange={(event) => {
                                  seteditclient(event.target.value);
                                }}
                                value={editclient} />
                              <label id='labelsinmodal'>Review</label>
                              <input type={'text'} value={editreview}
                                onChange={(event) => {
                                  seteditreview(event.target.value);
                                }
                                }

                                id='Footerlinks1' />
                              <label id='labelsinmodal'>Rating</label>

                              <Ratings
                                name="simple-controlled"
                                value={editrating}
                                onChange={(event, newValue) => {
                                  seteditratings(newValue);
                                }}
                              />

                              <button id='Footerlinks2' type='submit'>{createloading ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              /> : "Update"}</button>
                            </form>
                          </Modal.Body>

                        </Modal>

                        <Dialog
                          open={open}
                          // TransitionComponent={Transition}
                          keepMounted
                          onClose={handleClose}
                          aria-describedby="alert-dialog-slide-description"
                        >
                          <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                              Are you sure you want to delete this Rating ?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => deleteRatings(id)}>Ok</Button>
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
            </div>}
        </>
      }
    </>
  )
}

export default Rating
