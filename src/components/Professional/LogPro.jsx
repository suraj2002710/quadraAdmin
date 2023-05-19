import {Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { Pagination, Typography } from '@mui/material';
import axios from "axios"

import Spinner from 'react-bootstrap/Spinner';
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import { baseurl } from '../../Baseurl';
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogPro = () => {
    const history = createBrowserHistory()
  const cookie = new Cookies()
  const location=useLocation()
  const querypage=new URLSearchParams(location.search)
  const token = cookie.get('token')
  
  const [page, setpage] = useState(querypage.get('page')?parseInt(querypage.get('page')):1)
  const [counts, setcounts] = useState(0)
  const [id, setid] = useState(null)
  const [sessions, setsessions] = useState([])
  const localClients = JSON.parse(localStorage.getItem("adminLogin"))

  const [loading, setloading] = useState(true)
  const [temp, settemp] = useState(true)
  
  
  
  
  const [open, setOpen] = useState(false);
  const [query,setquery]=useState("")

  const navigate = useNavigate()
  const getsessions = async () => {
    const res = await axios.post(`${baseurl}/admin/all_user_login_logout_detalis/`, {
      ...localClients, page: page,role:"professional", page_size: 10
    });
    console.log(res);
    if (res.data.status === "Success") {
      setloading(false)
      let data = res.data
      setsessions(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    }
    else {
      console.log("suraj");
      setsessions([])
      setloading(false)
    }
  }


  const copyToClipboard = (text) => {
    console.log('text', text)
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    toast.info("Token Copy",   {position: toast.POSITION.TOP_CENTER})

  }

  
  useEffect(() => {
    if (!token) {
      history.push("/")
      navigate("/")
    }
  }, [])

  const sendpageinquery=(val)=>{
    navigate({
      pathname:'/dashboard/adminsession',
      search:`?page=${val}`
    })
  }
  const handleClickOpen = (id) => {
    setOpen(true);
    setid(id)
  };
  const handleClose = () => {
    setOpen(false);
  };
  const sessiondelete = async (id) => {

    const res = await axios.post(`${baseurl}/admin/delete_admin_session/`, {
      ...localClients, id: parseInt(id)
    });
    console.log(res.data.status);
    if (res.data.status === "Success") {
      setOpen(false)
      settemp("temp")
    }
  }
  useEffect(() => {
    if(query===""){
      setpage(querypage.get('page') !== null ? parseInt(querypage.get('page')) : 1)


      getsessions()
      settemp(true)
    }
  }, [page,query, temp])


  const searchfilter = async (query) => {
    setloading(true)
    const { data } = await axios.post(`${baseurl}/admin/search_admin_session/`, {
      ...localClients, purpose: "search", query: query, page: page, page_size: 10
    })
    if (data.status === 'Success') {
      console.log(data);
      setloading(false)
      setsessions(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    } else {
      setloading(false)
        setsessions([])
      setcounts(0)
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
                   Professional Login Details
                    </h1>
                  
                    <div className="ms-auto">

                    <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                      <div class="container-fluid">
  
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
  
                          <form class="d-flex" role="search">
                          {/* <input style={{ width: "250px" }} class="form-control me-2" type="search" onChange={(e) => {
                           if(e.target.value){
                            searchfilter(e.target.value)
                          }
                         setquery(e.target.value)
                         setpage(1)
                       }} placeholder="Search By Name" aria-label="Search" /> */}
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

           
            {!sessions.length? (<>
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
                          Admin Name
                          </th>
                         
                          <th
                              className="sorting_asc"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"

                            >
                              Logout Time
                            </th>
                           

                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Login Time
                            </th>

                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Registration Time
                            </th>

                         
                          </tr>
                          {
                            sessions.map((curEle, i) => {
                              const { professional_id, professional_name,last_login,last_logout,created_at
                                ,token,updated_at } = curEle
                              // console.log(rating);

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
                                  {/* <td className="checkbox-select">
                                    <span data-toggle="tooltip" title="Click to Copy" style={{cursor:"pointer"}} onClick={()=>copyToClipboard(token)}>

                                  {token.slice(0,10)+"....."}
                                    </span>
                                </td> */}
                                 
                               
                                <td className="checkbox-select">
                                {moment(last_login).format('MMMM Do YYYY, h:mm:ss a')}
                              </td>
                              <td className="checkbox-select">
                                {moment(last_logout).format('MMMM Do YYYY, h:mm:ss a')}
                              </td>
                              <td className="checkbox-select">
                              {moment(created_at).format('MMMM Do YYYY, h:mm:ss a')}
                              </td>
                                
                                  
                                  {/* <td className="akign-center nowrap">
                                    <div style={{ display: "flex" }}>
                                      <button
                                        style={{ marginLeft: "10px" }}
                                        id={id}
                                        onClick={(e) => {
                                          handleClickOpen(id)
                                          
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
                        <Dialog
                          open={open}
                          // TransitionComponent={Transition}
                          keepMounted
                          onClose={handleClose}
                          aria-describedby="alert-dialog-slide-description"
                        >
                         
                          <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                              Are you sure you want to delete this session ?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>cancel</Button>
                            <Button onClick={() => sessiondelete(id)}>ok</Button>
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
                                                <ToastContainer/>

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

export default LogPro