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

const Alladmin = () => {
  const history = createBrowserHistory()
  const cookie = new Cookies()
  const location = useLocation()
  const querypage = new URLSearchParams(location.search)
  const token = cookie.get('token')
  const [editmodalShow, seteditmodalShow] = useState(false)
  const [page, setpage] = useState(querypage.get('page') ? parseInt(querypage.get('page')) : 1)
  const [counts, setcounts] = useState(0)
  const [id, setid] = useState(null)
  const [admin, setadmin] = useState([])
  const localClients = JSON.parse(localStorage.getItem("adminLogin"))
  const [addmodalShow, setaddmodalShow] = useState(false)
  const [addadmin, setaddadmin] = useState("")
  const [loading, setloading] = useState(true)
  const [temp, settemp] = useState(true)
  const [admin_name, setadmin_name] = useState("")
  const [adminEmail, setadminEmail] = useState("")
  const [adminFirstname, setadminFirstname] = useState("")
  const [adminLastname, setadminLastname] = useState("")


  const [Email, setEmail] = useState("")
  const [Firstname, setFirstname] = useState("")
  const [Lastname, setLastname] = useState("")
  const [password, setpassword] = useState("")

  const [errDisplayEmail, seterrDisplayEmail] = useState("none")
  const [errDisplayFirstname, seterrDisplayFirstname] = useState("none")
  const [errDisplayLastname, seterrDisplayLastname] = useState("none")
  const [errDisplaypassword, seterrDisplaypassword] = useState("none")


  const [admin_id, setadmin_id] = useState("")
  const [admincreateloading, setadmincreateloading] = useState(false)
  const [adminupdateloading, setadminupdateloading] = useState("")
  const [open, setOpen] = useState(false);
  const [query, setquery] = useState("")
  const navigate = useNavigate()
  const getadmin = async () => {
    const res = await axios.post(`${baseurl}/admin/admin_fetch_data/`, {
      ...localClients, page: page, page_size: 10
    });
    console.log(res);
    if (res.data.status === "Success") {
      setloading(false)
      let data = res.data
      setadmin(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    }
    else {
      console.log("suraj");
      setadmin([])
      setloading(false)
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const admindelete = async (id) => {

    const res = await axios.put(`${baseurl}/admin/admin_update_delete/`, {
      ...localClients, user_id: id
    });
    console.log(res);
    if (res.data.status === "Sucsess") {
      settemp("temp")
      setOpen(false)
    }
  }
  useEffect(() => {
    if (query === "") {
      setpage(querypage.get('page') !== null ? parseInt(querypage.get('page')) : 1)
      getadmin()
      settemp(true)
    }
  }, [page, query, temp])

  const show = () => setaddmodalShow(true)
  const handleclose = () => {
    setaddadmin(null)
    setadmincreateloading(false)
    setaddmodalShow(false);
    setFirstname("")
    setLastname("")
    setEmail("")
    setpassword("")
    seterrDisplayEmail("none")
    seterrDisplayFirstname("none")
    seterrDisplayLastname("none")
    seterrDisplaypassword("none")
  }

  const handlecloseEdit = () => {
    setadminupdateloading(false)
    seteditmodalShow(false)
    setadmin_id("")
    setadmin_name("")
    seterrDisplayEmail("none")
    seterrDisplayFirstname("none")
    seterrDisplayLastname("none")
    seterrDisplaypassword("none")
  }
  useEffect(() => {
    if (!token) {
      history.push("/")
      navigate("/")
    }
  }, [])
  // password format MY@ddf@12df "MY@dff$132df"
let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const addAdmin = async (e) => {
    console.log(regex.test(password));
    e.preventDefault()
    if (!Firstname.length) {
      seterrDisplayFirstname("block")
    }
    if (!Lastname.length) {
      
      seterrDisplayLastname("block")
    }
    if (!Email.length) {
      seterrDisplayEmail("block")
    } if (!regex.test(password)) {
      seterrDisplaypassword("block")
    } else if (!Firstname.length || !Lastname.length || !Email.length || !regex.test(password)) {
      return false
    }
    else {
      setadmincreateloading(true)
      const { data } = await axios.post(`${baseurl}/admin/signup/`, {
        first_name: Firstname,
        last_name: Lastname,
        email: Email.toLowerCase(),
        password: password
      })

      if (data.status === "Success") {
        setadmincreateloading(false)
        setaddmodalShow(false)
        settemp(false)
        setFirstname("")
        setLastname("")
        setEmail("")
        setpassword("")
      }
    }
  }

  const sendpageinquery = (val) => {
    navigate({
      pathname: '/dashboard/Alladmin',
      search: `?page=${val}`
    })
  }


  const adminingle_fetch = async (id) => {
    setadminupdateloading("singlefeatch")
    const { data } = await axios.put(`${baseurl}/admin/admin_fetch_data/`, {
      ...localClients, user_id: id
    })
    console.log(data);
    if (data.status === "Success") {
      setadminupdateloading("")
      //   setadmin_id(data.Data[0].id)
      setadminEmail(data.data.email)
      setadminFirstname(data.data.first_name)
      setadminLastname(data.data.last_name)


    }
  }

  const adminupdate = async (e) => {
    e.preventDefault()

    if (!adminFirstname.length) {
      seterrDisplayFirstname("block")
    }
    if (!adminLastname.length) {
      seterrDisplayLastname("block")
    }
    else if (!adminFirstname.length || !adminLastname.length) {
      return false
    }
    else {

      setadminupdateloading(true)
      const { data } = await axios.post(`${baseurl}/admin/admin_update_delete/`, {
        ...localClients, user_id: parseInt(id), last_name: adminLastname, first_name: adminFirstname
      })
      console.log(data);
      if (data.status === "Sucsess") {
        seteditmodalShow(false)
        setadminupdateloading("update")
        setadminFirstname("")
        setadminLastname("")
        setadminEmail("")
        //   setadmin_id("")
        //   setadmin_name("")
        settemp(false)
      }
    }
  }
  const searchfilter = async (query) => {
    setloading(true)
    const { data } = await axios.post(`${baseurl}/admin/search_admin/`, {
      ...localClients, query: query, page: page, page_size: 10
    })
    if (data.status === 'Success') {
      console.log(data);

      setadmin(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
      setloading(false)
    } else {
      setloading(false)

      setadmin([])
      setcounts(0)
    }
  }

  useEffect(() => {
    if (query) {
      searchfilter(query)
      settemp(true)
    }
  }, [page, temp])

  return (
    <>
      <div className="content border-bottom mb-2">
        <div className="container-fluid">
          <div className="row">
            <div id="testkar" className="col-12 heading-me-outer d-flex align-items-center">
              <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                Admin List

              </h1>

              <div className="ms-auto">

                <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                  <div class="container-fluid">

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">

                      <form class="d-flex" role="
                          Search By Name">
                        <input style={{ width: "250px" }} onChange={(e) => {
                          setquery(e.target.value)
                          setpage(1)
                          if (e.target.value) {

                            searchfilter(e.target.value)
                          }
                        }} class="form-control me-2" type="search" placeholder="Search By Name and Email" aria-label="Search" />

                      </form>
                      <button className='extra-add-btn ms-2' onClick={show} >Add Users</button >
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


            {!admin.length ? (<>
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
                                First Name
                              </th>
                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                Last Name
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
                                Action
                              </th>
                            </tr>
                            {
                              admin.map((curEle, i) => {
                                const { id, first_name, user_id, last_name, email } = curEle
                                // console.log(rating);

                                return (
                                  <tr id="tableRow" key={i}>

                                    <td className="checkbox-select">
                                      {(page - 1) * 10 + i + 1}
                                    </td>

                                    <td className="checkbox-select">
                                      {first_name.slice(0, 1).toUpperCase() + first_name.slice(1, 25)}
                                    </td>
                                    <td className="checkbox-select">
                                      {last_name.slice(0, 1).toUpperCase() + last_name.slice(1, 25)}

                                    </td>
                                    <td className="checkbox-select">
                                      {email}
                                    </td>
                                    <td className="akign-center nowrap">
                                    
                                      <div style={{ display: "flex" }}>

                                        <button id={id}
                                          onClick={(e) => {
                                            setid(e.target.id)
                                            adminingle_fetch(e.target.id)
                                            seteditmodalShow(true)

                                          }}
                                        >
                                          <i class="fa-regular fa-pen-to-square" id={id}></i>
                                        </button>

                                        {admin.length!==1 ?
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
                                        :null}
                                      </div>
                                      
                              
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </table>

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
                                Admin Detail
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              {adminupdateloading === 'singlefeatch' ? <div style={{
                                display: "flex",
                                justifyContent: "center", marginTop: "24%"
                              }}>

                                <Spinner animation="border" />

                              </div> : <form onSubmit={adminupdate}>
                                <label id='labelsinmodal'>First Name</label>
                                <input id='Footerlinks1' type="text" value={adminFirstname} onChange={(e) => {
                                  seterrDisplayFirstname("none")
                                  setadminFirstname(e.target.value)
                                }} />
                                <span className={errDisplayFirstname}>Required</span>

                                <label id='labelsinmodal'>Last Name</label>
                                <input id='Footerlinks1' type="text" value={adminLastname}
                                  onChange={(e) => {
                                    seterrDisplayLastname("none")
                                    setadminLastname(e.target.value)
                                  }} />
                                <span className={errDisplayLastname}>Required</span>

                                <label id='labelsinmodal'>Email</label>
                                <input disabled id='Footerlinks1' type="text" value={adminEmail}
                                  onChange={(e) => setadminEmail(e.target.value)}
                                />
                                <span className={errDisplayEmail}>Required</span>

                                {/* <input id='Footerlinks1' type="text" value={adminLastname} onChange={(e) => seteditadmin_name(e.target.value)} placeholder="Enter Footerlink Name" /> */}
                                <button id='Footerlinks2' type="submit">{adminupdateloading ? <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                /> : "Update"}</button>
                              </form>}


                            </Modal.Body>

                          </Modal>

                          {/* Add admin */}
                          <Modal
                            show={addmodalShow}
                            className="rating_detail_modal"

                            onHide={handleclose}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title id="contained-modal-title-vcenter">
                                Admin Detail
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <form onSubmit={addAdmin}>
                                <label id='labelsinmodal'>First Name</label>
                                <input id='Footerlinks1' type="text" value={Firstname} onChange={(e) => {
                                  seterrDisplayFirstname("none")
                                  setFirstname(e.target.value)
                                }} />
                                <span className={errDisplayFirstname}>Required</span>

                                <label id='labelsinmodal'>Last Name</label>
                                <input id='Footerlinks1' type="text" value={Lastname}
                                  onChange={(e) => {
                                    seterrDisplayLastname("none")

                                    setLastname(e.target.value)
                                  }} />
                                <span className={errDisplayLastname}>Required</span>

                                <label id='labelsinmodal'>Email</label>
                                <input id='Footerlinks1' type="email" value={Email}
                                  onChange={(e) => {
                                    seterrDisplayEmail("none")

                                    setEmail(e.target.value)
                                  }}
                                />
                                <span className={errDisplayEmail}>Required</span>

                                <label id='labelsinmodal'>Password</label>
                                <input id='Footerlinks1' type="text" value={password}
                                  onChange={(e) => {
                                    seterrDisplaypassword("none")
                                    setpassword(e.target.value)
                                  }}
                                />
                                <span className={errDisplaypassword}>Password must be 8 characters and use special character, letter, digit(MY@ddf@12df) </span>
                                {/* <input id='Footerlinks1' type="text" value={adminLastname} onChange={(e) => seteditadmin_name(e.target.value)} placeholder="Enter Footerlink Name" /> */}
                                <button id='Footerlinks2' type="submit">{admincreateloading ? <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                /> : "Submit"}</button>
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
                                Are you sure you want to delete this Admin ?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>cancel</Button>
                              <Button onClick={() => admindelete(id)}>ok</Button>
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

export default Alladmin